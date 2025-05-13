
/**
 * Object to store data and share it across the different steps of a single scenario when needed.
 * The data is deleted after each scenario
 */
export class ScenarioData {
    /**
     * A map to store the key-value pairs of scenario data.
     * @private
     */
    private readonly data: Map<string, any>;
    
    //List of valid keys used to store data
    static readonly KEYS = {
        ORDER_ID:"ORDER_ID",
        DOWN_PAYMENT_AMOUNT:"DP_AMOUNT",
        TRADE_IN_VALUE:"TRADE_IN"
    }

    constructor() {
        this.data = new Map();
    }

    /**
     * Adds a key-value pair to the scenario data.
     * 
     * @param key - The key to associate with the value.
     * @param value - The value to store.
     */
    addData(key: string, value: any) {
        this.data.set(key, value);
    }

    /**
     * Retrieves the value associated with the specified key.
     * 
     * @param key - The key whose associated value is to be returned.
     * @returns The value associated with the key, or `undefined` if the key does not exist.
     */
    getData(key: string): any {
        return this.data.get(key);
    }
}