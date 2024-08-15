export class CtiClient {
    private baseUrl: string;
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    static async doRequest<T>(request: (...args: any[]) => Promise<T>) {
        {
            try {
                await request();
            } catch (error) {}
        }
    }
}
