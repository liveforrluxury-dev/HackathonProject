export function calculateEMI(principal : number, annualInterest : number, tenureYears : number ) : number {

    const monthlyInterest = annualInterest / 12 / 100;
    const totalMonths = tenureYears * 12;
    const calculateEMI = (principal * monthlyInterest * Math.pow(1 + monthlyInterest, totalMonths)) / (Math.pow(1 + monthlyInterest, totalMonths) - 1);

    return Math.round(calculateEMI);
}