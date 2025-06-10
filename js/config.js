// Configuration Management
class Config {
    constructor() {
        // In a real production environment, these would come from environment variables
        // For client-side apps, you'd typically use build-time environment variables
        this.supabaseUrl = 'https://tglfhceptxpbdljjrqct.supabase.co'
        this.supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnbGZoY2VwdHhwYmRsampycWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODA3NzYsImV4cCI6MjA2NTE1Njc3Nn0._L_vPaKmTP2v_5ZPbliMnVxQ_PGSxU0AQS0cCS4JFQY'
        
        // Feature flags
        this.features = {
            fileUpload: false, // Disabled until storage RLS is resolved
            debugMode: false,  // Set to true for development
            formValidation: true
        }
        
        // Form configuration
        this.form = {
            maxFileSize: 5 * 1024 * 1024, // 5MB
            allowedFileTypes: ['.pdf', '.doc', '.docx'],
            allowedMimeTypes: [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ]
        }
    }
    
    get isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('local')
    }
    
    get isProduction() {
        return !this.isDevelopment
    }
    
    log(...args) {
        if (this.features.debugMode || this.isDevelopment) {
            console.log('[ADAS Safe]', ...args)
        }
    }
    
    error(...args) {
        console.error('[ADAS Safe Error]', ...args)
    }
}

// Export singleton instance
window.ADASConfig = new Config()