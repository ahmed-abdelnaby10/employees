export const calculateAge = (birthDateString: string): number => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    
    const age = today.getFullYear() - birthDate.getFullYear();
    
    return age;
}
