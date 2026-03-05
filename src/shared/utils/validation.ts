export function isValidCPF(cpf: string): boolean {
    if (!cpf) return false;
    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) return false;
    return true;
}

export function isValidCNPJ(cnpj: string): boolean {
    if (!cnpj) return false;
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    if (cleanCNPJ.length !== 14) return false;
    return true;
}

export function isE164Phone(phone: string): boolean {
    if (!phone) return false;
    return /^\+?[1-9]\d{1,14}$/.test(phone);
}
