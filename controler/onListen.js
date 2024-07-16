module.exports = async () => {
      if (global.shelly.onListen.size == 0) return;

      try {
        global.shelly.onListen.forEach(async (current, KEY) => {
          try {
            const conditionResult = eval(current.condition);
            if (conditionResult) {
              const resultFunction = eval(current.result);
              if (typeof resultFunction === 'function') {
                await resultFunction();
              }
              global.shelly.onListen.delete(KEY);
            }
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
           console.log(err);
      }
}
