import { ServiceProvider } from './service-provider.class';

export class BeneficialOwner {
    constructor(
        public sp: ServiceProvider,
        public id: number,
        public name: string,
        public sharesTotal: number,
        public sharesChoice: number,
        public sharesaftersplit:number,
        public dividendChoice: number) {}
}
