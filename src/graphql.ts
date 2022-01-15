
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum IamAccountType {
    USER = "USER",
    SERVICE = "SERVICE"
}

export interface IamCreateAccountInput {
    id: string;
    type: IamAccountType;
    email: GraphQLString;
    isActive: GraphQLBoolean;
    clientId: string;
    dApplicationCodes: JSON;
    dPermissions: JSON;
    dTenants: JSON;
    data?: Nullable<JSON>;
    roleIds?: Nullable<Nullable<string>[]>;
    tenantIds?: Nullable<Nullable<string>[]>;
    user?: Nullable<IamCreateUserInput>;
}

export interface IamUpdateAccountInput {
    id: string;
    type?: Nullable<IamAccountType>;
    email?: Nullable<GraphQLString>;
    isActive?: Nullable<GraphQLBoolean>;
    clientId?: Nullable<string>;
    dApplicationCodes?: Nullable<JSON>;
    dPermissions?: Nullable<JSON>;
    dTenants?: Nullable<JSON>;
    data?: Nullable<JSON>;
    roleIds?: Nullable<Nullable<string>[]>;
    tenantIds?: Nullable<Nullable<string>[]>;
    user?: Nullable<IamUpdateUserInput>;
}

export interface IamCreateBoundedContextInput {
    id: string;
    name: GraphQLString;
    sort?: Nullable<GraphQLInt>;
    isActive: GraphQLBoolean;
}

export interface IamUpdateBoundedContextInput {
    id: string;
    name?: Nullable<GraphQLString>;
    sort?: Nullable<GraphQLInt>;
    isActive?: Nullable<GraphQLBoolean>;
}

export interface IamCreatePermissionInput {
    id: string;
    name: GraphQLString;
    boundedContextId: string;
    roleIds?: Nullable<Nullable<string>[]>;
}

export interface IamUpdatePermissionInput {
    id: string;
    name?: Nullable<GraphQLString>;
    boundedContextId?: Nullable<string>;
    roleIds?: Nullable<Nullable<string>[]>;
}

export interface IamCreateRoleInput {
    id: string;
    name: GraphQLString;
    isMaster: GraphQLBoolean;
    permissionIds?: Nullable<Nullable<string>[]>;
    accountIds?: Nullable<Nullable<string>[]>;
}

export interface IamUpdateRoleInput {
    id: string;
    name?: Nullable<GraphQLString>;
    isMaster?: Nullable<GraphQLBoolean>;
    permissionIds?: Nullable<Nullable<string>[]>;
    accountIds?: Nullable<Nullable<string>[]>;
}

export interface IamCreateTenantInput {
    id: string;
    name: GraphQLString;
    code?: Nullable<GraphQLString>;
    logo?: Nullable<GraphQLString>;
    isActive: GraphQLBoolean;
    data?: Nullable<JSON>;
    accountIds?: Nullable<Nullable<string>[]>;
}

export interface IamUpdateTenantInput {
    id: string;
    name?: Nullable<GraphQLString>;
    code?: Nullable<GraphQLString>;
    logo?: Nullable<GraphQLString>;
    isActive?: Nullable<GraphQLBoolean>;
    data?: Nullable<JSON>;
    accountIds?: Nullable<Nullable<string>[]>;
}

export interface IamCreateUserInput {
    id: string;
    accountId: string;
    name: GraphQLString;
    surname?: Nullable<GraphQLString>;
    avatar?: Nullable<GraphQLString>;
    mobile?: Nullable<GraphQLString>;
    langId?: Nullable<string>;
    username: GraphQLString;
    password: GraphQLString;
    rememberToken?: Nullable<GraphQLString>;
    data?: Nullable<JSON>;
}

export interface IamUpdateUserInput {
    id: string;
    accountId?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    surname?: Nullable<GraphQLString>;
    avatar?: Nullable<GraphQLString>;
    mobile?: Nullable<GraphQLString>;
    langId?: Nullable<string>;
    username?: Nullable<GraphQLString>;
    password?: Nullable<GraphQLString>;
    rememberToken?: Nullable<GraphQLString>;
    data?: Nullable<JSON>;
}

export interface QueryStatement {
    where?: Nullable<JSON>;
    include?: Nullable<Nullable<GraphQLString>[]>;
    order?: Nullable<JSON>;
    limit?: Nullable<GraphQLInt>;
    offset?: Nullable<GraphQLInt>;
}

export interface IamAccount {
    id: string;
    type: IamAccountType;
    email: GraphQLString;
    isActive: GraphQLBoolean;
    clientId: string;
    dApplicationCodes: JSON;
    dPermissions: JSON;
    dTenants: JSON;
    data?: Nullable<JSON>;
    roles?: Nullable<Nullable<IamRole>[]>;
    tenants?: Nullable<Nullable<IamTenant>[]>;
    user?: Nullable<IamUser>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IQuery {
    iamFindAccount(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamFindAccountById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamGetAccounts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamAccount>[] | Promise<Nullable<IamAccount>[]>;
    iamPaginateAccounts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamFindBoundedContext(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamFindBoundedContextById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamGetBoundedContexts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext>[] | Promise<Nullable<IamBoundedContext>[]>;
    iamPaginateBoundedContexts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamFindPermission(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamFindPermissionById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamGetPermissions(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamPermission>[] | Promise<Nullable<IamPermission>[]>;
    iamPaginatePermissions(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamFindRole(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamFindRoleById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamGetRoles(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamRole>[] | Promise<Nullable<IamRole>[]>;
    iamPaginateRoles(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamFindTenant(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamFindTenantById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamGetTenants(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamTenant>[] | Promise<Nullable<IamTenant>[]>;
    iamPaginateTenants(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamFindUser(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamFindUserById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamGetUsers(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamUser>[] | Promise<Nullable<IamUser>[]>;
    iamPaginateUsers(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    hello(): Nullable<string> | Promise<Nullable<string>>;
}

export interface IMutation {
    iamCreateAccount(payload: IamCreateAccountInput): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamCreateAccounts(payload: Nullable<IamCreateAccountInput>[]): boolean | Promise<boolean>;
    iamUpdateAccount(payload: IamUpdateAccountInput, constraint?: Nullable<QueryStatement>): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamDeleteAccountById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamDeleteAccounts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamAccount>[] | Promise<Nullable<IamAccount>[]>;
    iamCreateBoundedContext(payload: IamCreateBoundedContextInput): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamCreateBoundedContexts(payload: Nullable<IamCreateBoundedContextInput>[]): boolean | Promise<boolean>;
    iamUpdateBoundedContext(payload: IamUpdateBoundedContextInput, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamDeleteBoundedContextById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamDeleteBoundedContexts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext>[] | Promise<Nullable<IamBoundedContext>[]>;
    iamCreatePermission(payload: IamCreatePermissionInput): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamCreatePermissions(payload: Nullable<IamCreatePermissionInput>[]): boolean | Promise<boolean>;
    iamUpdatePermission(payload: IamUpdatePermissionInput, constraint?: Nullable<QueryStatement>): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamDeletePermissionById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamDeletePermissions(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamPermission>[] | Promise<Nullable<IamPermission>[]>;
    iamCreateRole(payload: IamCreateRoleInput): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamCreateRoles(payload: Nullable<IamCreateRoleInput>[]): boolean | Promise<boolean>;
    iamUpdateRole(payload: IamUpdateRoleInput, constraint?: Nullable<QueryStatement>): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamDeleteRoleById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamDeleteRoles(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamRole>[] | Promise<Nullable<IamRole>[]>;
    iamCreateTenant(payload: IamCreateTenantInput): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamCreateTenants(payload: Nullable<IamCreateTenantInput>[]): boolean | Promise<boolean>;
    iamUpdateTenant(payload: IamUpdateTenantInput, constraint?: Nullable<QueryStatement>): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamDeleteTenantById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamDeleteTenants(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamTenant>[] | Promise<Nullable<IamTenant>[]>;
    iamCreateUser(payload: IamCreateUserInput): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamCreateUsers(payload: Nullable<IamCreateUserInput>[]): boolean | Promise<boolean>;
    iamUpdateUser(payload: IamUpdateUserInput, constraint?: Nullable<QueryStatement>): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamDeleteUserById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamDeleteUsers(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamUser>[] | Promise<Nullable<IamUser>[]>;
}

export interface IamBoundedContext {
    id: string;
    name: GraphQLString;
    sort?: Nullable<GraphQLInt>;
    isActive: GraphQLBoolean;
    permissions?: Nullable<Nullable<IamPermission>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IamPermission {
    id: string;
    name: GraphQLString;
    boundedContextId: string;
    boundedContext: IamBoundedContext;
    roles?: Nullable<Nullable<IamRole>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IamRole {
    id: string;
    name: GraphQLString;
    isMaster: GraphQLBoolean;
    permissions?: Nullable<Nullable<IamPermission>[]>;
    accounts?: Nullable<Nullable<IamAccount>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IamTenant {
    id: string;
    name: GraphQLString;
    code?: Nullable<GraphQLString>;
    logo?: Nullable<GraphQLString>;
    isActive: GraphQLBoolean;
    data?: Nullable<JSON>;
    accounts?: Nullable<Nullable<IamAccount>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IamUser {
    id: string;
    accountId: string;
    account: IamAccount;
    name: GraphQLString;
    surname?: Nullable<GraphQLString>;
    avatar?: Nullable<GraphQLString>;
    mobile?: Nullable<GraphQLString>;
    langId?: Nullable<string>;
    username: GraphQLString;
    password: GraphQLString;
    rememberToken?: Nullable<GraphQLString>;
    data?: Nullable<JSON>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface Pagination {
    total: GraphQLInt;
    count: GraphQLInt;
    rows: Nullable<JSON>[];
}

export type JSON = any;
export type Any = any;
export type Upload = any;
export type GraphQLString = any;
export type GraphQLInt = any;
export type GraphQLFloat = any;
export type GraphQLBoolean = any;
export type GraphQLISODateTime = any;
export type GraphQLTimestamp = any;
export type GraphQLUpload = any;
type Nullable<T> = T | null;
