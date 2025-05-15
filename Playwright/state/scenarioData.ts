export class ScenarioData {
    /**
     * Map to store data with a string key and any type value.
     * This allows for flexible storage of different types of data.
     */
    private readonly data: Map<string, any>;

    constructor() {
        this.data = new Map();
    }

    addData(key: string, value: any) {
        this.data.set(key, value);
    }
    /**
     * Retrieves data associated with the given key.
     * @param key - The key to look up in the data map.
     * @returns The value associated with the key, or undefined if not found.
     */
    getData(key: string): any {
        return this.data.get(key);
    }
}