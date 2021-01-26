import CodePush, { RemotePackage } from 'react-native-code-push';
import { captureException } from 'src/services/reporting';

/** Documentation
 * @url https://github.com/microsoft/react-native-code-push/blob/master/docs/api-js.md
 */

async function scheduleInstallation(remotePackage: RemotePackage) {
  const update = await remotePackage.download();
  update.install(CodePush.InstallMode.ON_NEXT_SUSPEND);
  CodePush.notifyAppReady();
}

async function installNow(remotePackage: RemotePackage) {
  const update = await remotePackage.download();
  await update.install(CodePush.InstallMode.IMMEDIATE);
  CodePush.notifyAppReady();
}

export const Init = async () => {
  // TODO: Change to hook, the idea of displaying an alert before downloading sounds really good.
  try {
    const update = await CodePush.checkForUpdate();
    if (update) {
      const { isMandatory } = update;
      const metadata = await CodePush.getUpdateMetadata();
      const isNewUpdate = metadata && metadata.label !== update.label;
      if (isNewUpdate || !metadata) {
        if (isMandatory) {
          await installNow(update);
          return;
        }
        await scheduleInstallation(update);
      }
    }
  } catch (error) {
    captureException(error);
  }
};
