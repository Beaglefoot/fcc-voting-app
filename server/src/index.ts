import app from './app';
import getCurrentTime from './helpers/getCurrentTime';
import getCurrentIp from './helpers/getCurrentIp';

const PORT = process.argv[2] || 3000;
const currentTime = getCurrentTime();
const currentIp = getCurrentIp();

app.listen(PORT, () =>
  console.log(
    `[${currentTime}] express is running at http://${currentIp}:${PORT}`
  )
);
