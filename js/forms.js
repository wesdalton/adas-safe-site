// ADAS Safe - Production Form Handlers
class ADASForms {
    constructor() {
        this.config = window.ADASConfig
        this.supabase = null
        this.init()
    }
    
    async init() {
        try {
            this.supabase = window.supabase.createClient(
                this.config.supabaseUrl, 
                this.config.supabaseAnonKey
            )
            this.config.log('Supabase client initialized')
            this.setupFormHandlers()
        } catch (error) {
            this.config.error('Failed to initialize forms:', error)
        }
    }
    
    setupFormHandlers() {
        // Contact Form
        const contactForm = document.getElementById('contact-form')
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmission(e))
            this.config.log('Contact form handler attached')
        }
        
        // Career Form
        const careerForm = document.getElementById('career-application-form')
        if (careerForm) {
            careerForm.addEventListener('submit', (e) => this.handleCareerSubmission(e))
            this.config.log('Career form handler attached')
        }
    }
    
    async handleContactSubmission(event) {
        event.preventDefault()
        
        const form = event.target
        const submitButton = form.querySelector('button[type="submit"]')
        
        try {
            // Validate form
            if (!this.validateForm(form)) {
                this.showMessage('Please fill in all required fields.', 'error')
                return
            }
            
            // Show loading state
            this.setLoadingState(submitButton, true)
            
            // Extract form data
            const formData = new FormData(form)
            const contactData = {
                first_name: formData.get('first-name')?.trim() || null,
                last_name: formData.get('last-name')?.trim() || null,
                email: formData.get('email')?.trim() || null,
                phone: formData.get('phone')?.trim() || null,
                message: formData.get('message')?.trim() || null
            }
            
            this.config.log('Submitting contact form:', contactData)
            
            // Submit to database
            const { data, error } = await this.supabase
                .from('contact_submissions')
                .insert([contactData])
            
            if (error) throw error
            
            // Success
            this.showMessage('Thank you for contacting us! We will get back to you soon.', 'success')
            form.reset()
            this.config.log('Contact form submitted successfully')
            
        } catch (error) {
            this.config.error('Contact form submission failed:', error)
            this.showMessage('Sorry, there was an error submitting your message. Please try again.', 'error')
        } finally {
            this.setLoadingState(submitButton, false)
        }
    }
    
    async handleCareerSubmission(event) {
        event.preventDefault()
        
        const form = event.target
        const submitButton = form.querySelector('button[type="submit"]')
        const fileInput = document.getElementById('resume-upload')
        
        try {
            // Validate form
            if (!this.validateForm(form)) {
                this.showMessage('Please fill in all required fields.', 'error')
                return
            }
            
            // Validate file
            const file = fileInput.files[0]
            if (!file) {
                this.showMessage('Please upload your resume.', 'error')
                return
            }
            
            if (!this.validateFile(file)) {
                return // Error message shown in validateFile
            }
            
            // Show loading state
            this.setLoadingState(submitButton, true)
            
            // Extract form data
            const formData = new FormData(form)
            const careerData = {
                first_name: formData.get('first-name')?.trim() || null,
                last_name: formData.get('last-name')?.trim() || null,
                phone: formData.get('phone')?.trim() || null,
                email: formData.get('email-career')?.trim() || null,
                experience_years: formData.get('experience-years') || null,
                country: formData.get('country') || null,
                address_line_1: formData.get('address-line-1')?.trim() || null,
                address_line_2: formData.get('address-line-2')?.trim() || null,
                city: formData.get('city')?.trim() || null,
                state: formData.get('state')?.trim() || null,
                zip_code: formData.get('zip-code')?.trim() || null,
                resume_filename: file.name,
                resume_file_size: file.size,
                resume_url: this.config.features.fileUpload ? null : `pending_${file.name}`
            }
            
            this.config.log('Submitting career application:', careerData)
            
            // Handle file upload if enabled
            if (this.config.features.fileUpload) {
                const uploadResult = await this.uploadResume(file)
                if (uploadResult.success) {
                    careerData.resume_url = uploadResult.url
                } else {
                    throw new Error(`File upload failed: ${uploadResult.error}`)
                }
            }
            
            // Submit to database
            const { data, error } = await this.supabase
                .from('career_applications')
                .insert([careerData])
            
            if (error) throw error
            
            // Success
            const message = this.config.features.fileUpload 
                ? 'Thank you for your application! We will review it and get back to you soon.'
                : 'Thank you for your application! We have received your information. Please email your resume to contact@adas-safe.com.'
            
            this.showMessage(message, 'success')
            form.reset()
            this.config.log('Career application submitted successfully')
            
        } catch (error) {
            this.config.error('Career application submission failed:', error)
            this.showMessage('Sorry, there was an error submitting your application. Please try again.', 'error')
        } finally {
            this.setLoadingState(submitButton, false)
        }
    }
    
    async uploadResume(file) {
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`
            
            const { data, error } = await this.supabase.storage
                .from('resumes')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: file.type
                })
            
            if (error) throw error
            
            const { data: { publicUrl } } = this.supabase.storage
                .from('resumes')
                .getPublicUrl(fileName)
            
            return { success: true, url: publicUrl }
        } catch (error) {
            this.config.error('File upload failed:', error)
            return { success: false, error: error.message }
        }
    }
    
    validateForm(form) {
        if (!this.config.features.formValidation) return true
        
        const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]')
        let isValid = true
        
        requiredFields.forEach(field => {
            const value = field.value.trim()
            if (!value) {
                this.highlightInvalidField(field, true)
                isValid = false
            } else {
                this.highlightInvalidField(field, false)
            }
        })
        
        return isValid
    }
    
    validateFile(file) {
        // Check file size
        if (file.size > this.config.form.maxFileSize) {
            this.showMessage(`File size must be less than ${this.config.form.maxFileSize / (1024 * 1024)}MB.`, 'error')
            return false
        }
        
        // Check file type
        const fileName = file.name.toLowerCase()
        const hasValidExtension = this.config.form.allowedFileTypes.some(ext => 
            fileName.endsWith(ext.toLowerCase())
        )
        
        if (!hasValidExtension) {
            this.showMessage(`Please upload a valid resume file (${this.config.form.allowedFileTypes.join(', ')}).`, 'error')
            return false
        }
        
        return true
    }
    
    highlightInvalidField(field, isInvalid) {
        field.style.borderColor = isInvalid ? 'var(--primary)' : 'var(--glass-border)'
    }
    
    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.dataset.originalText = button.textContent
            button.textContent = 'Submitting...'
            button.disabled = true
        } else {
            button.textContent = button.dataset.originalText || 'Submit'
            button.disabled = false
        }
    }
    
    showMessage(message, type = 'info') {
        // Simple alert for now - can be replaced with custom modal/toast
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'
        alert(`${icon} ${message}`)
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ADASForms()
})