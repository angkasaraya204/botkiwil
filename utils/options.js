/**
 * Get Client Options
 * @param  {Function} start function
 * @param  {Boolean} headless
 */

module.exports = options = (start) => {
    const options = {
        sessionId: 'piyobot',
        headless: true,
        multiDevice: true,
        qrTimeout: 0,
        authTimeout: 0,
        restartOnCrash: start,
        cacheEnabled: false,
        useChrome: true
        // chromiumArgs: [
        //     '--disable-setuid-sandbox',
        //     '--aggressive-cache-discard',
        //     '--disable-cache',
        //     '--disable-application-cache',
        //     '--disable-offline-load-stale-cache',
        //     '--disk-cache-size=0'
        // ]

    }
    return options
}
