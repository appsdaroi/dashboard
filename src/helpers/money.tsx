import { formatToBRL } from 'brazilian-values';

const CentsToReais = (value: string) => {
    return (formatToBRL((parseInt(value) / 10000).toFixed(2)));
}

const ReaisToCents = (value: string) => {
    return parseInt(value.toString().replace(/\D/g, '')) * 100;
}

export { CentsToReais, ReaisToCents }