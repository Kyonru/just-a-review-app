import Analytics from 'appcenter-analytics';

export const Init = async () => {
  await Analytics.setEnabled(false);
};
