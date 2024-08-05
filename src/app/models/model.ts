export interface Option {
    id: number;   
    text: string; 
    value: number; 
  }
  
  
  export interface Box {
    id: number; 
    selectedOption?: Option; 
  }