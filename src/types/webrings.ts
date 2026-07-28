export interface Webring {
    icon: string;
    iconAlt: string;
    name: string;
    url: string;
    onNext: () => void;
    onPrev: () => void;
    onRand: () => void;
    default?: boolean;
    id: string;
}