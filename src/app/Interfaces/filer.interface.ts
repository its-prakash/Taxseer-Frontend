export interface Filer {
    id: number;
    name: string;
    ein: string;

    addr?: string;
    addr2?: string;
    city?: string;
    st?: string;
    zip?: string;
    address?: string;

    phone?: string;
    email?: string;
    stateNo?: string;
    date?: string;

    note?: string;
    isRecent?: boolean;

    formsUsed?: string;
    pending?: number;
    filed2025?: number;
    w9Received?: string;
    w9Waiting?: number;
    
}
