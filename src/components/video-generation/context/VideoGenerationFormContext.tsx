'use client';

import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';

interface VideoGenerationFormState {
  title: string;
  inputImageName: string;
  outputImageName: string;
  inputImageSrc: string | null;
  outputImageSrc: string | null;
  inputImageFile: File | null;
  errorMessage: string | null;
}

type Action =
  | { type: 'set_title'; payload: string }
  | { type: 'set_error'; payload: string | null }
  | { type: 'set_input'; payload: { file: File; src: string; name: string } }
  | { type: 'clear_input' }
  | { type: 'set_output'; payload: { src: string; name: string } }
  | { type: 'clear_output' }
  | { type: 'reset' };

const initialState: VideoGenerationFormState = {
  title: '',
  inputImageName: '',
  outputImageName: '',
  inputImageSrc: null,
  outputImageSrc: null,
  inputImageFile: null,
  errorMessage: null,
};

const reducer = (state: VideoGenerationFormState, action: Action): VideoGenerationFormState => {
  switch (action.type) {
    case 'set_title':
      return { ...state, title: action.payload };
    case 'set_error':
      return { ...state, errorMessage: action.payload };
    case 'set_input':
      return {
        ...state,
        errorMessage: null,
        inputImageFile: action.payload.file,
        inputImageSrc: action.payload.src,
        inputImageName: action.payload.name,
      };
    case 'clear_input':
      return {
        ...state,
        errorMessage: null,
        inputImageFile: null,
        inputImageSrc: null,
        inputImageName: '',
      };
    case 'set_output':
      return {
        ...state,
        errorMessage: null,
        outputImageSrc: action.payload.src,
        outputImageName: action.payload.name,
      };
    case 'clear_output':
      return {
        ...state,
        errorMessage: null,
        outputImageSrc: null,
        outputImageName: '',
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

interface VideoGenerationFormContextValue extends VideoGenerationFormState {
  setTitle: (value: string) => void;
  setError: (value: string | null) => void;
  setInputImage: (file: File | null) => void;
  setOutputImage: (file: File | null) => void;
  reset: () => void;
}

const VideoGenerationFormContext = createContext<VideoGenerationFormContextValue | undefined>(undefined);

export const VideoGenerationFormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInputImage = (file: File | null) => {
    if (!file) {
      if (state.inputImageSrc?.startsWith('blob:')) {
        URL.revokeObjectURL(state.inputImageSrc);
      }
      dispatch({ type: 'clear_input' });
      return;
    }

    if (state.inputImageSrc?.startsWith('blob:')) {
      URL.revokeObjectURL(state.inputImageSrc);
    }
    dispatch({
      type: 'set_input',
      payload: {
        file,
        src: URL.createObjectURL(file),
        name: file.name,
      },
    });
  };

  const setOutputImage = (file: File | null) => {
    if (!file) {
      if (state.outputImageSrc?.startsWith('blob:')) {
        URL.revokeObjectURL(state.outputImageSrc);
      }
      dispatch({ type: 'clear_output' });
      return;
    }

    if (state.outputImageSrc?.startsWith('blob:')) {
      URL.revokeObjectURL(state.outputImageSrc);
    }
    dispatch({
      type: 'set_output',
      payload: {
        src: URL.createObjectURL(file),
        name: file.name,
      },
    });
  };

  const reset = () => {
    if (state.inputImageSrc?.startsWith('blob:')) {
      URL.revokeObjectURL(state.inputImageSrc);
    }
    if (state.outputImageSrc?.startsWith('blob:')) {
      URL.revokeObjectURL(state.outputImageSrc);
    }
    dispatch({ type: 'reset' });
  };

  const value = useMemo<VideoGenerationFormContextValue>(
    () => ({
      ...state,
      setTitle: (value) => dispatch({ type: 'set_title', payload: value }),
      setError: (value) => dispatch({ type: 'set_error', payload: value }),
      setInputImage,
      setOutputImage,
      reset,
    }),
    [state],
  );

  return <VideoGenerationFormContext.Provider value={value}>{children}</VideoGenerationFormContext.Provider>;
};

export const useVideoGenerationForm = () => {
  const context = useContext(VideoGenerationFormContext);
  if (!context) {
    throw new Error('useVideoGenerationForm must be used within VideoGenerationFormProvider');
  }
  return context;
};
