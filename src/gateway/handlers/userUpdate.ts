import { User } from "../../structures/user.ts"
import { UserPayload } from "../../types/user.ts"
import { Gateway, GatewayEventHandler } from '../index.ts'

export const userUpdate: GatewayEventHandler = async (
  gateway: Gateway,
  d: UserPayload
) => {
  const oldUser: User | undefined = await gateway.client.users.get(d.id)
  await gateway.client.users.set(d.id, d)
  const newUser: User = (await gateway.client.users.get(d.id) as unknown) as User

  if (oldUser !== undefined) {
    gateway.client.emit('userUpdate', oldUser, newUser)
  } else gateway.client.emit('userUpdateUncached', newUser)
}