import { User } from "../../entity/user";
import { BaseModal } from "../base-modal";

export default function ModalListUsers({
  users,
  show,
  onExit
}: {
  users: User[];
  show: boolean;
  onExit: () => void
}) {
  return (
    <BaseModal show={show} onExit={onExit}>
      <form className="w-[500px] max-h-[500px] max-w-full bg-white rounded pb-6 flex flex-col">
        <h4 className="text-center p-4 border-b border-b-gray-400 mb-4 font-semibold">
          List Users Of This Room
        </h4>

        <div className="px-4 flex-1 flex flex-col gap-4 overflow-auto">
          {users.map((user) => {
            return (
              <div
                key={user._id}
                className="border py-2 px-4 rounded-md flex items-center gap-4"
              >
                <div
                  className="w-10 h-10 rounded-full border border-gray-300"
                  style={{ background: user.color }}
                ></div>
                <div>{user.name}</div>
              </div>
            );
          })}
        </div>
      </form>
    </BaseModal>
  );
}
