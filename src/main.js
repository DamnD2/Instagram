import { appModule } from "./app/app.module";
import { fillEditModal, editUserModal } from "./utils/initModals";
import { headerComponent } from "./app/components/header.component";

appModule.start();

void function init() {
  if (location.search) {
    const userId = location.search.split('=')[1];
    fillEditModal(userId);
    editUserModal.classList.add('show');
  }
}();