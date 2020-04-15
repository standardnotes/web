/* eslint-disable prefer-promise-reject-errors */
import { SNAlertService } from 'snjs';
import { SKAlert } from 'sn-stylekit';

export class AlertService extends SNAlertService {
  async alert(
    text: string,
    title: string,
    closeButtonText = 'OK',
    onClose: () => void
  ) {
    return new Promise((resolve) => {
      const buttons = [
        {
          text: closeButtonText,
          style: "neutral",
          action: async () => {
            if (onClose) {
              this.deviceInterface!.timeout(onClose);
            }
            resolve(true);
          }
        }
      ];
      const alert = new SKAlert({ title, text, buttons });
      alert.present();
    });
  }

  async confirm(
    text: string,
    title: string,
    confirmButtonText = 'Confirm',
    cancelButtonText = 'Cancel',
    onConfirm: () => void,
    onCancel: () => void,
    destructive = false
  ) {
    return new Promise((resolve, reject) => {
      const buttons = [
        {
          text: cancelButtonText,
          style: "neutral",
          action: async () => {
            if (onCancel) {
              this.deviceInterface!.timeout(onCancel);
            }
            reject(false);
          }
        },
        {
          text: confirmButtonText,
          style: destructive ? "danger" : "info",
          action: async () => {
            if (onConfirm) {
              this.deviceInterface!.timeout(onConfirm);
            }
            resolve(true);
          }
        },
      ];
      const alert = new SKAlert({ title, text, buttons });
      alert.present();
    });
  }
}