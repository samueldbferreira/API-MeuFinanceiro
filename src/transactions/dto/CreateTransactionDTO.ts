import { IsEnum, IsNumber, IsNotEmpty } from 'class-validator';

export enum TransactionType {
    DESPESA = 'Despesa',
    RECEITA = 'Receita',
}

export enum TransactionCategories {
    ALIMENTACAO = 'Alimentação',
    TRANSPORTE = 'Transporte',
    LAZER = 'Lazer',
    CASA = 'Casa',
    OUTROS = 'Outros',
}

export class CreateTransactionDTO {
    @IsNotEmpty()
    title: string;
    
    @IsNumber()
    @IsNotEmpty()
    amount: number;
    
    @IsNotEmpty()
    @IsEnum(TransactionCategories)
    category: string;
    
    @IsNotEmpty()
    @IsEnum(TransactionType)
    type: string;
    
    @IsNotEmpty()
    isInstallment: boolean;
    
    @IsNumber()
    installmentCount?: number;
}

