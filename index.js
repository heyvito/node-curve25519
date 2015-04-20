var curve = require('./build/Release/curve.node').curve,
    baseBuffer = (function() {
        var b = new Buffer(32);
        b.fill(0);
        b[0] = 9;
        return b;
    })();

module.exports = {

    /**
     * Modifies a given buffer instance to be used as a secret key.
     * @param  {Buffer} buffer Buffer to be used as a secret key.
     * @return {Buffer}        Modified buffer ready to be used as a
     *                         secret key
     */
    makeSecretKey: function(buffer) {
        if(!(buffer instanceof Buffer)) {
            throw new Error('expected buffer argument to be a Buffer');
        }
        if(buffer.length !== 32) {
            throw new Error('Expected buffer argumento to have 32 bytes');
        }
        buffer[0] &= 248;
        buffer[31] = (buffer[31] & 127) | 64;
        return buffer;
    },

    /**
     * Derives a public key from a given secret key
     * @param  {Buffer} secretKey Secret key to be derived
     * @return {Buffer}           Public key for the given secret key
     */
    derivePublicKey: function(secretKey) {
        var publicKey = new Buffer(32);
        curve(publicKey, secretKey, baseBuffer)
        return publicKey;
    },

    /**
     * Derives a given shared secret key with a given public key
     * @param  {Buffer} secret    Secret key to be used in the derivation
     * @param  {Buffer} publicKey Public key to be used in the derivation
     * @return {Buffer}           Result derivation of the given secret and
     *                            public key
     */
    deriveSharedSecret: function(secret, publicKey) {
        var sharedSecret = new Buffer(32);
        curve(sharedSecret, secret, publicKey);
        return sharedSecret;
    }
};
