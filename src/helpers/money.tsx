import { formatToBRL } from 'brazilian-values';

const CentsToReais = (value: string) => {
    return formatToBRL(parseInt(value) / 100);
}

const ReaisToCents = (value: string) => {
    console.log(value)
    return parseInt(value.toString().replace(/\D/g, '')) * 100;
}

export { CentsToReais, ReaisToCents }