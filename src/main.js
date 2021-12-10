import { appModule } from "./app/app.module";
import { fillEditModal, editUserModal } from "./utils/initModals";

appModule.start();

void function init() {
  if (location.search) {
    const userId = location.search.split('=')[1];
    fillEditModal(userId);
    editUserModal.classList.add('show');
  }
}();