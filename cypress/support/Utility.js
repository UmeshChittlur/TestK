const testData = new Map();

export default {
    setValue(name, value) {
        testData.set(name, value)
        return this
    },

    getValue(name) {
        const value = testData.get(name)
        return value
    }
}