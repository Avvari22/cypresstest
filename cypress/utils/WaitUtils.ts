export class WaitUtils {
    static waitForPageLoad(timeout: number = 10000): Promise<void> {
        return new Promise((resolve, reject) => {
            const checkReadyState = () => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    setTimeout(checkReadyState, 100);
                }   
            }
        });
    };
}