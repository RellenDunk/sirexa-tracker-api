export interface Tracker {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TrackerData {
    name: string;
    description: string;
}