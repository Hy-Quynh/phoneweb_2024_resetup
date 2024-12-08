export type AdminBody = {
  name: string
  email: string
  roleId: string
  password?: string
}

export type AdminLoginBodyType = {
  email: string
  password: string
}