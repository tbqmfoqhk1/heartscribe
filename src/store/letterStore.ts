import { create } from 'zustand'
import { LetterFormData, GeneratedLetter } from '../types/letter'

interface LetterStore {
  formData: LetterFormData
  generatedLetter: GeneratedLetter | null
  isLoading: boolean
  error: string | null
  
  // Actions
  updateFormData: (data: Partial<LetterFormData>) => void
  setGeneratedLetter: (letter: GeneratedLetter) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  resetForm: () => void
}

const initialFormData: LetterFormData = {
  emotion: '사과',
  situation: '',
  tone: '정중한',
  length: '보통',
  additionalContext: ''
}

export const useLetterStore = create<LetterStore>((set) => ({
  formData: initialFormData,
  generatedLetter: null,
  isLoading: false,
  error: null,
  
  updateFormData: (data) => 
    set((state) => ({ 
      formData: { ...state.formData, ...data } 
    })),
    
  setGeneratedLetter: (letter) => 
    set({ generatedLetter: letter }),
    
  setLoading: (loading) => 
    set({ isLoading: loading }),
    
  setError: (error) => 
    set({ error }),
    
  resetForm: () => 
    set({ 
      formData: initialFormData, 
      generatedLetter: null, 
      error: null 
    })
}))
