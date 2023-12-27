const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const goals = require('mineflayer-pathfinder').goals;

const bot = mineflayer.createBot({
  host: 'pro.pfaumc.io',
  username: 'ChatGPT_Bot',
  auth: 'offline'
});

bot.loadPlugin(pathfinder);

const teleportAndRetreat = (coordsList, playerName) => {
  console.log(`Телепортирую: ${playerName}...`);

  // Создаем массив целей на основе переданных координат
  const goalsList = coordsList.map(coords => new goals.GoalBlock(coords[0], coords[1], coords[2]));

  // Устанавливаем первую цель
  bot.pathfinder.setGoal(goalsList[0]);

  // Ждем, пока бот достигнет первой цели
  setTimeout(() => {
    // После задержки переходим к следующей цели
    bot.pathfinder.setGoal(goalsList[1]);

    // Ждем, пока бот достигнет второй цели
    setTimeout(() => {
      // Возвращаем бота к первой цели
      bot.pathfinder.setGoal(goalsList[0]);

      // Ждем, пока бот достигнет первой цели
      setTimeout(() => {
        // Устанавливаем цель для отступления
        const retreatGoal = new goals.GoalBlock(-60, 83, 20);
        bot.pathfinder.setGoal(retreatGoal);
      }, 2000);
    }, 2000);
  }, 2000 * (goalsList.length - 1));
};

bot.on('message', (jsonMsg) => {
  try {
    const message = JSON.parse(jsonMsg.toString());
  } catch (error) {
    const currentTime = new Date().toLocaleString();
    console.log(`${currentTime} - System (Raw):`, jsonMsg.toString());
    const msg = jsonMsg.toString();

    // Define player coordinates and names
    const playerCoordinates = {
      'Jammerenka': [[-52, 83, 20], [-52, 83, 17]], //1
            'none': [[-53, 83, 20], [-53, 83, 16]], //2
  '666_Nergal_666': [[-54, 83, 20], [-54, 83, 17]], //3
            'none': [[-55, 83, 20], [-55, 83, 16]], //4
        'weridepy': [[-56, 83, 20], [-56, 83, 17]], //5
            'none': [[-57, 83, 20], [-57, 83, 16]], //6
       'Git1erAFK': [[-58, 83, 20], [-58, 83, 17]], //7
            'none': [[-59, 83, 20], [-59, 83, 16]], //8
    'thediabetic0': [[-60, 83, 20], [-60, 83, 17]], //9
            'none': [[-61, 83, 20], [-61, 83, 16]], //10
 'lllBlackAngelll': [[-62, 83, 20], [-62, 83, 17]], //11
            'none': [[-63, 83, 20], [-63, 83, 16]], //12
            'none': [[-64, 83, 20], [-64, 83, 17]], //13
            'none': [[-65, 83, 20], [-65, 83, 16]], //14
            'none': [[-66, 83, 20], [-66, 83, 17]], //15
            'none': [[-67, 83, 20], [-67, 83, 16]], //16

            'none': [[-67, 83, 20], [-67, 83, 26]], //17
            'none': [[-66, 83, 20], [-66, 83, 25]], //18
            'none': [[-65, 83, 20], [-65, 83, 26]], //19
            'none': [[-64, 83, 20], [-64, 83, 25]], //20
            'none': [[-63, 83, 20], [-63, 83, 26]], //21
            'none': [[-62, 83, 20], [-62, 83, 25]], //22
            'none': [[-61, 83, 20], [-61, 83, 26]], //23
            'none': [[-60, 83, 20], [-60, 83, 25]], //24
            'none': [[-59, 83, 20], [-59, 83, 26]], //25
        'biggolub': [[-58, 83, 20], [-58, 83, 25]], //26
            'none': [[-57, 83, 20], [-57, 83, 26]], //27
            'none': [[-56, 83, 20], [-56, 83, 25]], //28
            'none': [[-55, 83, 20], [-55, 83, 26]], //29
            'none': [[-54, 83, 20], [-54, 83, 25]], //30
            'none': [[-53, 83, 20], [-53, 83, 26]], //31
            'none': [[-52, 83, 20], [-52, 83, 25]], //32



    };

    //работа с лс
    if (msg.includes('->')) {
      if (!msg.includes('напиши')) {
        const playerName = getPlayerName(msg);
        if (playerName) {
          const coordinates = playerCoordinates[playerName];
          if (coordinates) {
            teleportAndRetreat(coordinates, playerName);
          } else {
            console.log(`Player ${playerName} not found in the coordinates list.`);
          }
        }
      }
      else if (msg.includes('напиши')) {
        const messageToWrite = msg.split('напиши ')[1];
        if (messageToWrite) {
          bot.chat(messageToWrite)
        } else {
          console.log(`Invalid usage of "напиши" command. Example: напиши Привет`);
        }
      }
    }
  }
});

function getPlayerName(msg) {
  const arrowIndex = msg.indexOf('->');
  const playerNameIndex = msg.indexOf('✉') + 1;

  if (arrowIndex !== -1 && playerNameIndex !== -1) {
    return msg.substring(playerNameIndex, arrowIndex).trim();
  }

  return null;
}



bot.on('error', (err) => {
  console.error('Bot encountered an error:', err);
});
