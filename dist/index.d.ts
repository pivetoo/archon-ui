import { AxiosRequestConfig } from 'axios';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ClassProp } from 'class-variance-authority/types';
import { ClassValue } from 'clsx';
import { default as default_2 } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { JSX } from 'react/jsx-runtime';
import { LucideProps } from 'lucide-react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React_2 from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as ToastPrimitives from '@radix-ui/react-toast';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { VariantProps } from 'class-variance-authority';

declare type Action = {
    type: ActionType["ADD_TOAST"];
    toast: ToasterToast;
} | {
    type: ActionType["UPDATE_TOAST"];
    toast: Partial<ToasterToast>;
} | {
    type: ActionType["DISMISS_TOAST"];
    toastId?: ToasterToast["id"];
} | {
    type: ActionType["REMOVE_TOAST"];
    toastId?: ToasterToast["id"];
};

declare type ActionType = typeof actionTypes;

declare const actionTypes: {
    readonly ADD_TOAST: "ADD_TOAST";
    readonly UPDATE_TOAST: "UPDATE_TOAST";
    readonly DISMISS_TOAST: "DISMISS_TOAST";
    readonly REMOVE_TOAST: "REMOVE_TOAST";
};

export declare interface ActiveSession {
    sessionId: string;
    ipAddress: string;
    userAgent: string;
    createdAt: string;
    expiresAt: string;
    isActive: boolean;
    isCurrent: boolean;
}

export declare interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]> | string[] | unknown;
    isApiError: boolean;
}

export declare interface ApiResponse<T = unknown, TErrors = unknown> {
    message: string;
    data?: T;
    errors?: TErrors;
    pagination?: PaginationMetadata;
}

export declare const AppLayout: React_2.FC<AppLayoutProps>;

export declare interface AppLayoutProps {
    title: string;
    titleStyle?: React_2.CSSProperties;
    titleClassName?: string;
    subtitle?: string;
    logo?: React_2.ReactNode;
    user: {
        name: string;
        email: string;
        username?: string;
        role?: string;
        avatarUrl?: string;
        preferredLanguage?: string;
        lastLoginAt?: string;
    };
    menuItems?: SidebarItemData[];
    menuGroups?: SidebarGroup[];
    initialCollapsed?: boolean;
    onLogout?: () => void;
    notifications?: NotificationItem[];
    onNotificationRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
    onClearAllNotifications?: () => void;
    onViewAllNotifications?: () => void;
    breadcrumbs?: BreadcrumbItem[];
    modules?: Module[];
    currentModule?: string;
    onModuleChange?: (moduleId: string) => void;
    profilePath?: string;
    onProfileNavigate?: (path: string) => void;
    onLogoClick?: () => void;
    companyLogo?: string;
    headerMode?: SidebarHeaderMode;
    headerLogo?: string;
    headerLogoCollapsed?: string;
    children?: React_2.ReactNode;
}

export declare type ArchonCulture = "pt-BR" | "en-US" | "es-AR";

export declare const AreaChart: React_2.ForwardRefExoticComponent<AreaChartProps & React_2.RefAttributes<HTMLDivElement>>;

export declare interface AreaChartDataItem {
    name: string;
    [key: string]: any;
}

export declare interface AreaChartProps {
    data: AreaChartDataItem[];
    dataKeys: string[];
    xAxisKey?: string;
    colors?: string[];
    showGrid?: boolean;
    showLegend?: boolean;
    showTooltip?: boolean;
    width?: number | `${number}%`;
    height?: number | `${number}%`;
    className?: string;
    strokeWidth?: number;
    fillOpacity?: number;
}

export declare interface AuthContextData {
    user: User | null;
    contract: ContractType | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (data: LoginResult) => void;
    logout: () => void;
    logoutAllDevices: () => Promise<void>;
    refreshAccessToken: () => Promise<void>;
    getActiveSessions: () => Promise<ActiveSession[]>;
    updateUser: (userData: Partial<User>) => void;
}

export declare const AuthProvider: React_2.FC<AuthProviderProps>;

declare interface AuthProviderProps {
    children: React_2.ReactNode;
    onLogout?: () => void;
}

export declare class AuthService {
    static identify(credentials: LoginCredentials): Promise<IdentifyResult | null>;
    static logout(): void;
    static isAuthenticated(): boolean;
    static getCurrentUser(): any | null;
    static getAccessToken(): string | null;
    static getRefreshToken(): string | null;
    static logoutFromServer(): Promise<void>;
    static logoutAllDevices(): Promise<void>;
    static refreshAccessToken(): Promise<RefreshTokenResponse | null>;
    static exchangeAuthorizationCode(request: OidcTokenRequest): Promise<OidcTokenResponse>;
    static getActiveSessions(): Promise<ActiveSession[]>;
    static isTokenExpiringSoon(token: string, minutesBeforeExpiry?: number): boolean;
    static ensureValidToken(): Promise<boolean>;
}

export declare function Badge({ className, variant, ...props }: BadgeProps): JSX.Element;

export declare interface BadgeProps extends React_2.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}

export declare const badgeVariants: (props?: ({
    variant?: "secondary" | "success" | "error" | "warning" | "info" | "outline" | "default" | "destructive" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const BarChart: React_2.ForwardRefExoticComponent<BarChartProps & React_2.RefAttributes<HTMLDivElement>>;

export declare interface BarChartDataItem {
    name: string;
    [key: string]: any;
}

export declare interface BarChartProps {
    data: BarChartDataItem[];
    dataKeys: string[];
    xAxisKey?: string;
    colors?: string[];
    showGrid?: boolean;
    showLegend?: boolean;
    showTooltip?: boolean;
    width?: number | `${number}%`;
    height?: number | `${number}%`;
    className?: string;
    barSize?: number;
    layout?: "horizontal" | "vertical";
}

export declare const Breadcrumb: React_2.ForwardRefExoticComponent<BreadcrumbProps & React_2.RefAttributes<HTMLElement>>;

export declare interface BreadcrumbItem {
    label: string;
    onClick?: () => void;
}

export declare interface BreadcrumbProps extends React_2.HTMLAttributes<HTMLElement> {
    items: BreadcrumbItem[];
    separator?: React_2.ReactNode;
}

export declare const buildIdentityManagementAuthorizeUrl: ({ identityManagementUrl, clientId, callbackPath, currentOrigin, redirectUri, scope, contractId, }: {
    identityManagementUrl?: string;
    clientId: string;
    callbackPath?: string;
    currentOrigin?: string;
    redirectUri?: string;
    scope?: string;
    contractId?: string | number;
}) => Promise<string | undefined>;

export declare const buildIdentityManagementLoginUrl: ({ identityManagementUrl, clientId, callbackPath, currentOrigin, redirectUri, scope, contractId, }: {
    identityManagementUrl?: string;
    clientId: string;
    callbackPath?: string;
    currentOrigin?: string;
    redirectUri?: string;
    scope?: string;
    contractId?: string | number;
}) => Promise<string | undefined>;

export declare function buildPaginationQuery(params?: PagedRequest): string;

export declare const Button: React_2.ForwardRefExoticComponent<ButtonProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare interface ButtonProps extends React_2.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: React_2.ReactNode;
    iconPosition?: "left" | "right";
}

export declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "success" | "error" | "danger" | "warning" | "info" | "outline" | "outline-secondary" | "outline-primary" | "outline-success" | "outline-warning" | "outline-danger" | "ghost" | "text" | "link" | "dark" | null | undefined;
    size?: "sm" | "md" | "lg" | "icon" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const Callback: default_2.FC<CallbackProps>;

export declare interface CallbackProps {
    redirectTo?: string;
    identityManagementUrl?: string;
    oidcClientId?: string;
    oidcRedirectUri?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export declare const Card: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CardContent: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CardDescription: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CardFooter: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CardHeader: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CardTitle: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare interface ChangePasswordPayload {
    userId: number;
    currentPassword: string;
    newPassword: string;
}

export declare const ChartContainer: React_2.ForwardRefExoticComponent<ChartContainerProps & React_2.RefAttributes<HTMLDivElement>>;

export declare interface ChartContainerProps {
    title?: string;
    icon?: React_2.ReactNode;
    children: React_2.ReactNode;
    emptyMessage?: string;
    isEmpty?: boolean;
    height?: number | string;
    className?: string;
}

export declare const Checkbox: React_2.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare function cn(...inputs: ClassValue[]): string;

export declare const ConfirmModal: React_2.ForwardRefExoticComponent<ConfirmModalProps & React_2.RefAttributes<HTMLDivElement>>;

export declare interface ConfirmModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    variant?: "primary" | "secondary" | "success" | "error" | "danger" | "warning" | "info";
    loading?: boolean;
}

export declare interface ContractType {
    contractId: number;
    systemApplicationName: string;
    companyName: string;
    roleName?: string;
    portalUrl?: string;
}

export declare function DataTable<T = any>({ columns, data, loading, rowKey, selectable, selectedRows, onSelectionChange, onRowClick, onRowDoubleClick, className, emptyText, dragSelect, pageSize: initialPageSize, pageSizeOptions }: DataTableProps<T>): JSX.Element;

export declare interface DataTableColumn<T = any> {
    key: string;
    title: string;
    dataIndex?: keyof T;
    render?: (value: any, record: T, index: number) => React_2.ReactNode;
    sortable?: boolean;
    width?: string | number;
}

export declare function DataTablePreview<T = any>({ columns, data, rowKey, selectedRow, onRowSelect, renderDetail, renderPagination, className, tableClassName, detailClassName, gridRatio, }: DataTablePreviewProps<T>): JSX.Element;

export declare interface DataTablePreviewColumn<T = any> {
    key: string;
    title: string;
    dataIndex?: keyof T;
    render?: (value: any, record: T) => React_2.ReactNode;
    width?: string | number;
}

export declare interface DataTablePreviewProps<T = any> {
    columns: DataTablePreviewColumn<T>[];
    data: T[];
    rowKey: keyof T | ((record: T) => string | number);
    selectedRow?: T | null;
    onRowSelect?: (record: T | null) => void;
    renderDetail?: (record: T) => React_2.ReactNode;
    renderPagination?: () => React_2.ReactNode;
    className?: string;
    tableClassName?: string;
    detailClassName?: string;
    gridRatio?: [number, number];
}

export declare interface DataTableProps<T = any> {
    columns: DataTableColumn<T>[];
    data: T[];
    loading?: boolean;
    rowKey: keyof T | ((record: T) => string | number);
    selectable?: boolean;
    selectedRows?: T[];
    onSelectionChange?: (selected: T[]) => void;
    onRowClick?: (record: T) => void;
    onRowDoubleClick?: (record: T) => void;
    className?: string;
    emptyText?: string;
    dragSelect?: boolean;
    pageSize?: number;
    pageSizeOptions?: number[];
}

export declare const Dropdown: React_2.FC<DropdownMenuPrimitive.DropdownMenuProps>;

export declare const DropdownCheckboxItem: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownContent: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownGroup: React_2.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownItem: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownLabel: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownPortal: React_2.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;

export declare const DropdownRadioGroup: React_2.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownRadioItem: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownSeparator: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownShortcut: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLSpanElement>): JSX.Element;
    displayName: string;
};

export declare const DropdownSub: React_2.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;

export declare const DropdownSubContent: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownSubTrigger: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownTrigger: React_2.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare function FilterDropdown({ label, value, options, onChange, clearLabel, allValue, }: FilterDropdownProps): JSX.Element;

export declare interface FilterDropdownOption {
    value: string;
    label: string;
}

export declare interface FilterDropdownProps {
    label: string;
    value: string;
    options: FilterDropdownOption[];
    onChange: (value: string) => void;
    clearLabel?: string;
    allValue?: string;
}

export declare const getApiBaseURL: () => string;

export declare const getIdentityManagementURL: () => string;

export declare function getInitials(name: string): string;

export declare const getRequestLanguage: () => string;

export declare const GlobalLoader: React_2.FC<GlobalLoaderProps>;

declare interface GlobalLoaderContextType {
    isLoading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
}

export declare interface GlobalLoaderProps {
    isVisible: boolean;
    className?: string;
}

export declare const GlobalLoaderProvider: React_2.FC<GlobalLoaderProviderProps>;

declare interface GlobalLoaderProviderProps {
    children: React_2.ReactNode;
}

declare class HttpClient {
    private instance;
    constructor();
    updateBaseURL(url: string): void;
    private setupInterceptors;
    private transformError;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
}

export declare const httpClient: HttpClient;

export declare interface I18nContextValue {
    culture: ArchonCulture;
    uiCulture: string;
    messages: Record<string, string>;
    isLoading: boolean;
    error: string | null;
    setCulture: (culture: ArchonCulture) => Promise<void>;
    t: (key: string) => string;
}

export declare const I18nProvider: React_2.FC<I18nProviderProps>;

export declare interface I18nProviderProps {
    children: React_2.ReactNode;
    initialCulture?: ArchonCulture;
    catalogLoader?: (culture: ArchonCulture) => Promise<LocalizationCatalog>;
    loadingFallback?: React_2.ReactNode;
}

export declare interface IdentifyResult {
    authenticationStep: 'contractSelection';
    userId: number;
    userName: string;
    userEmail: string;
    authorizationSessionToken: string;
    availableContracts: ContractType[];
}

export declare const Input: React_2.ForwardRefExoticComponent<InputProps & React_2.RefAttributes<HTMLInputElement>>;

export declare interface InputProps extends React_2.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    helperText?: string;
}

export declare const LanguageFlag: React_2.FC<LanguageFlagProps>;

export declare interface LanguageFlagProps {
    culture: ArchonCulture;
    className?: string;
}

export declare const LineChart: React_2.ForwardRefExoticComponent<LineChartProps & React_2.RefAttributes<HTMLDivElement>>;

export declare interface LineChartDataItem {
    name: string;
    [key: string]: any;
}

export declare interface LineChartProps {
    data: LineChartDataItem[];
    dataKeys: string[];
    xAxisKey?: string;
    colors?: string[];
    showGrid?: boolean;
    showLegend?: boolean;
    showTooltip?: boolean;
    showDots?: boolean;
    width?: number | `${number}%`;
    height?: number | `${number}%`;
    className?: string;
    strokeWidth?: number;
}

export declare interface LocalizationCatalog {
    culture: string;
    uiCulture: string;
    messages: Record<string, string>;
}

export declare interface LoginCredentials {
    username: string;
    password: string;
    authorizeUrl?: string;
}

export declare interface LoginResult {
    authenticationStep: 'completed';
    accessToken: string;
    refreshToken: string;
    tokenType?: string;
    expiresIn?: number;
    user: User;
    contract: ContractType;
    redirectUrl?: string;
}

export declare const Modal: React_2.FC<DialogPrimitive.DialogProps>;

export declare const ModalBody: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX.Element;
    displayName: string;
};

export declare const ModalClose: React_2.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare const ModalContent: React_2.ForwardRefExoticComponent<ModalContentProps & React_2.RefAttributes<HTMLDivElement>>;

export declare interface ModalContentProps extends React_2.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, VariantProps<typeof modalContentVariants> {
}

declare const modalContentVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "form" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const ModalDescription: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React_2.RefAttributes<HTMLParagraphElement>, "ref"> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const ModalFooter: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX.Element;
    displayName: string;
};

export declare const ModalHeader: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX.Element;
    displayName: string;
};

export declare const ModalOverlay: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ModalPortal: React_2.FC<DialogPrimitive.DialogPortalProps>;

export declare const ModalTitle: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React_2.RefAttributes<HTMLHeadingElement>, "ref"> & React_2.RefAttributes<HTMLHeadingElement>>;

export declare const ModalTrigger: React_2.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare interface Module {
    id: string;
    name: string;
    icon?: React_2.ReactNode;
}

export declare const Navbar: React_2.ForwardRefExoticComponent<NavbarProps & React_2.RefAttributes<HTMLElement>>;

export declare interface NavbarProps extends React_2.HTMLAttributes<HTMLElement> {
    isCollapsed?: boolean;
    isMobile?: boolean;
    onMobileMenuToggle?: () => void;
    breadcrumbs?: BreadcrumbItem[];
    user?: {
        name: string;
        email: string;
        username?: string;
        role?: string;
        avatarUrl?: string;
        preferredLanguage?: string;
        lastLoginAt?: string;
    };
    companyName?: string;
    notifications?: NotificationItem[];
    onNotificationRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
    onClearAllNotifications?: () => void;
    onViewAllNotifications?: () => void;
    userMenuTrigger?: React_2.ReactNode;
    actions?: React_2.ReactNode;
    modules?: Module[];
    currentModule?: string;
    onModuleChange?: (moduleId: string) => void;
    profilePath?: string;
    onProfileNavigate?: (path: string) => void;
    onLogout?: () => void;
}

export declare interface NavigationConfig {
    basePath?: string;
    items?: SidebarItemData[];
    groups?: SidebarGroup[];
}

export declare interface NotificationItem {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    type?: 'info' | 'success' | 'warning' | 'error';
}

export declare const OIDC_CODE_VERIFIER_KEY = "@Archon:oidc:codeVerifier";

export declare const OIDC_NONCE_KEY = "@Archon:oidc:nonce";

export declare const OIDC_REDIRECT_URI_KEY = "@Archon:oidc:redirectUri";

export declare const OIDC_STATE_KEY = "@Archon:oidc:state";

export declare interface OidcTokenRequest {
    identityManagementUrl: string;
    clientId: string;
    code: string;
    redirectUri: string;
    codeVerifier: string;
}

export declare interface OidcTokenResponse {
    access_token: string;
    id_token?: string;
    refresh_token?: string;
    token_type: string;
    expires_in: number;
    scope?: string;
}

export declare interface PageAction {
    key: string;
    label: string;
    icon?: React_2.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-warning" | "outline-danger" | "ghost" | "danger";
    onClick: () => void;
    disabled?: boolean;
}

export declare interface PagedRequest {
    page?: number;
    pageSize?: number;
}

export declare const PageLayout: React_2.FC<PageLayoutProps>;

export declare interface PageLayoutProps {
    title: string;
    subtitle?: string;
    titleClassName?: string;
    density?: "default" | "compact";
    filtersSlot?: React_2.ReactNode;
    actions?: PageAction[];
    showDefaultActions?: boolean;
    onAdd?: () => void;
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onRefresh?: () => void;
    selectedRowsCount?: number;
    children?: React_2.ReactNode;
    className?: string;
}

export declare interface PaginatedResult<T> {
    data: T[];
    total?: number;
    totalCount?: number;
    page?: number;
    pageSize?: number;
    totalPages?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}

export declare interface PaginationMetadata {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export declare interface PaginationParams extends PagedRequest {
    search?: string;
    orderBy?: string;
}

export declare const PieChart: React_2.ForwardRefExoticComponent<PieChartProps & React_2.RefAttributes<HTMLDivElement>>;

export declare interface PieChartDataItem {
    name: string;
    value: number;
    [key: string]: any;
}

export declare interface PieChartProps {
    data: PieChartDataItem[];
    dataKey?: string;
    nameKey?: string;
    colors?: string[];
    showLabels?: boolean;
    showLegend?: boolean;
    showTooltip?: boolean;
    innerRadius?: number;
    outerRadius?: number;
    labelFormatter?: (props: any) => string;
    width?: number | `${number}%`;
    height?: number | `${number}%`;
    className?: string;
}

export declare class ProfileService {
    static updateProfile(request: UpdateProfileRequest): Promise<User>;
    static changePassword(payload: ChangePasswordPayload): Promise<void>;
}

export declare const ProtectedRoute: default_2.FC<ProtectedRouteProps>;

export declare interface ProtectedRouteProps {
    children: default_2.ReactElement;
    isAuthenticated: boolean;
    redirectTo?: string;
    externalRedirect?: boolean;
    callbackPath?: string;
    oidcClientId?: string;
    oidcScope?: string;
    oidcRedirectUri?: string;
}

export declare function queryCollection<T extends object>(items: T[], params?: PaginationParams, searchFields?: string[]): PaginatedResult<T>;

export declare const RadioGroup: React_2.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const RadioGroupItem: React_2.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupItemProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare const reducer: (state: State, action: Action) => State;

export declare interface RefreshTokenRequest {
    refreshToken: string;
}

export declare interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
}

export declare interface RequestState<T = unknown> {
    data: T | null;
    loading: boolean;
    error: ApiError | null;
    message: string;
    pagination: PaginationMetadata | null;
}

export declare interface RevokeRefreshTokenRequest {
    refreshToken: string;
}

export declare function SearchableSelect({ value, onValueChange, options, placeholder, searchPlaceholder, disabled, }: SearchableSelectProps): JSX.Element;

export declare interface SearchableSelectOption {
    value: string;
    label: string;
}

declare interface SearchableSelectProps {
    value?: string;
    onValueChange: (value: string) => void;
    options: SearchableSelectOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    disabled?: boolean;
}

export declare const Select: React_2.FC<SelectPrimitive.SelectProps>;

export declare const SelectContent: React_2.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const SelectGroup: React_2.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React_2.RefAttributes<HTMLDivElement>>;

export declare const SelectItem: React_2.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const SelectLabel: React_2.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const SelectScrollDownButton: React_2.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const SelectScrollUpButton: React_2.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const SelectSeparator: React_2.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const SelectTrigger: React_2.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare const SelectValue: React_2.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React_2.RefAttributes<HTMLSpanElement>>;

export declare const setApiBaseURL: (url: string) => void;

export declare const setAuthFailureHandler: (handler: (() => void) | null) => void;

export declare const setGlobalLoaderContext: (context: any) => void;

export declare const setIdentityManagementURL: (url: string) => void;

export declare const setRequestLanguage: (language: string) => void;

export declare function setTranslationMessages(messages: Record<string, string>): void;

export declare const Sheet: React_2.FC<DialogPrimitive.DialogProps>;

export declare const SheetClose: React_2.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare const SheetContent: React_2.ForwardRefExoticComponent<SheetContentProps & React_2.RefAttributes<HTMLDivElement>>;

export declare interface SheetContentProps extends React_2.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, VariantProps<typeof sheetVariants> {
}

export declare const SheetDescription: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React_2.RefAttributes<HTMLParagraphElement>, "ref"> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const SheetFooter: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX.Element;
    displayName: string;
};

export declare const SheetHeader: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX.Element;
    displayName: string;
};

export declare const SheetOverlay: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const SheetPortal: React_2.FC<DialogPrimitive.DialogPortalProps>;

export declare function SheetPreviewField({ label, value, className, ...props }: SheetPreviewFieldProps): JSX.Element;

export declare interface SheetPreviewFieldProps extends React_2.HTMLAttributes<HTMLDivElement> {
    label: React_2.ReactNode;
    value: React_2.ReactNode;
}

export declare function SheetPreviewGrid({ className, ...props }: SheetPreviewGridProps): JSX.Element;

export declare interface SheetPreviewGridProps extends React_2.HTMLAttributes<HTMLDivElement> {
}

export declare function SheetPreviewHeader({ eyebrow, title, meta, description, className, }: SheetPreviewHeaderProps): JSX.Element;

export declare interface SheetPreviewHeaderProps {
    eyebrow?: React_2.ReactNode;
    title: React_2.ReactNode;
    meta?: React_2.ReactNode;
    description?: React_2.ReactNode;
    className?: string;
}

export declare function SheetPreviewSection({ title, description, defaultOpen, children, className, }: SheetPreviewSectionProps): JSX.Element;

export declare interface SheetPreviewSectionProps {
    title: React_2.ReactNode;
    description?: React_2.ReactNode;
    defaultOpen?: boolean;
    children: React_2.ReactNode;
    className?: string;
}

export declare const SheetTitle: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React_2.RefAttributes<HTMLHeadingElement>, "ref"> & React_2.RefAttributes<HTMLHeadingElement>>;

export declare const SheetTrigger: React_2.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

declare const sheetVariants: (props?: ({
    side?: "left" | "right" | "top" | "bottom" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const Sidebar: React_2.ForwardRefExoticComponent<SidebarProps & React_2.RefAttributes<HTMLDivElement>>;

export declare const SidebarContent: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const SidebarFooter: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare interface SidebarGroup {
    label: string;
    items: SidebarItemData[];
    collapsible?: boolean;
    defaultExpanded?: boolean;
}

export declare const SidebarHeader: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare type SidebarHeaderMode = 'default' | 'companyLogo';

export declare interface SidebarItemData {
    key: string;
    label: string;
    icon?: React_2.ReactNode;
    onClick?: () => void;
    active?: boolean;
    path?: string;
}

export declare const SidebarNav: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLElement> & React_2.RefAttributes<HTMLElement>>;

export declare const SidebarNavItem: React_2.ForwardRefExoticComponent<SidebarNavItemProps & React_2.RefAttributes<HTMLAnchorElement>>;

export declare interface SidebarNavItemProps extends React_2.HTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    icon?: React_2.ReactNode;
    href?: string;
}

export declare interface SidebarProps extends React_2.HTMLAttributes<HTMLDivElement> {
    title?: string;
    titleStyle?: React_2.CSSProperties;
    titleClassName?: string;
    logo?: React_2.ReactNode;
    items?: SidebarItemData[];
    groups?: SidebarGroup[];
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
    width?: number;
    collapsedWidth?: number;
    showCollapseButton?: boolean;
    onLogout?: () => void;
    onLogoClick?: () => void;
    companyLogo?: string;
    headerMode?: SidebarHeaderMode;
    headerLogo?: string;
    headerLogoCollapsed?: string;
    isMobile?: boolean;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
    mobileWidth?: number;
}

declare interface State {
    toasts: ToasterToast[];
}

export declare const Switch: React_2.ForwardRefExoticComponent<Omit<SwitchPrimitives.SwitchProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare const Table: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableElement> & React_2.RefAttributes<HTMLTableElement>>;

export declare const TableBody: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableSectionElement> & React_2.RefAttributes<HTMLTableSectionElement>>;

export declare const TableCaption: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableCaptionElement> & React_2.RefAttributes<HTMLTableCaptionElement>>;

export declare const TableCell: React_2.ForwardRefExoticComponent<React_2.TdHTMLAttributes<HTMLTableCellElement> & React_2.RefAttributes<HTMLTableCellElement>>;

export declare const TableFooter: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableSectionElement> & React_2.RefAttributes<HTMLTableSectionElement>>;

export declare const TableHead: React_2.ForwardRefExoticComponent<React_2.ThHTMLAttributes<HTMLTableCellElement> & React_2.RefAttributes<HTMLTableCellElement>>;

export declare const TableHeader: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableSectionElement> & React_2.RefAttributes<HTMLTableSectionElement>>;

export declare const TableRow: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableRowElement> & React_2.RefAttributes<HTMLTableRowElement>>;

export declare function TableToolbar({ summary, searchValue, onSearchChange, searchPlaceholder, leftSlot, rightSlot, className, }: TableToolbarProps): JSX.Element;

export declare interface TableToolbarProps {
    summary?: React_2.ReactNode;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    leftSlot?: React_2.ReactNode;
    rightSlot?: React_2.ReactNode;
    className?: string;
}

export declare const Tabs: React_2.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React_2.RefAttributes<HTMLDivElement>>;

export declare const TabsContent: React_2.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const TabsList: React_2.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const TabsTrigger: React_2.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

declare interface ThemeContextType {
    isDark: boolean;
    toggleDark: () => void;
}

export declare const ThemeProvider: React_2.FC<ThemeProviderProps>;

declare interface ThemeProviderProps {
    children: React_2.ReactNode;
    defaultDark?: boolean;
}

export declare const Toast: React_2.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastProps & React_2.RefAttributes<HTMLLIElement>, "ref"> & VariantProps<(props?: ({
    variant?: "success" | "warning" | "info" | "default" | "destructive" | null | undefined;
} & ClassProp) | undefined) => string> & {
    showIcon?: boolean;
} & React_2.RefAttributes<HTMLLIElement>>;

export declare function toast({ ...props }: Toast_2): {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
};

declare type Toast_2 = Omit<ToasterToast, "id">;

export declare const ToastAction: React_2.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastActionProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare type ToastActionElement = React_2.ReactElement<typeof ToastAction>;

export declare const ToastDescription: React_2.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastDescriptionProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare function Toaster(): JSX.Element;

declare type ToasterToast = ToastProps & {
    id: string;
    title?: React_2.ReactNode;
    description?: React_2.ReactNode;
    action?: ToastActionElement;
};

export declare const toastIcons: {
    default: null;
    success: React_2.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React_2.RefAttributes<SVGSVGElement>>;
    destructive: React_2.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React_2.RefAttributes<SVGSVGElement>>;
    warning: React_2.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React_2.RefAttributes<SVGSVGElement>>;
    info: React_2.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React_2.RefAttributes<SVGSVGElement>>;
};

export declare type ToastProps = React_2.ComponentPropsWithoutRef<typeof Toast>;

export declare const ToastProvider: React_2.FC<ToastPrimitives.ToastProviderProps>;

export declare const ToastTitle: React_2.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastTitleProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ToastViewport: React_2.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastViewportProps & React_2.RefAttributes<HTMLOListElement>, "ref"> & React_2.RefAttributes<HTMLOListElement>>;

export declare const Tooltip: React_2.FC<TooltipPrimitive.TooltipProps>;

export declare const TooltipContent: React_2.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const TooltipProvider: React_2.FC<TooltipPrimitive.TooltipProviderProps>;

export declare const TooltipTrigger: React_2.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare function translate(key: string): string;

export declare interface UpdateProfileRequest {
    id: number;
    username: string;
    email: string;
    name: string;
    avatarUrl?: string;
    isActive?: boolean;
}

export declare function useApi<T = any>(options?: UseApiOptions): {
    execute: (apiCall: () => Promise<any>) => Promise<any>;
    reset: () => void;
    isLoading: boolean;
    hasError: boolean;
    hasData: boolean;
    data: T | null;
    loading: boolean;
    error: ApiError | null;
    message: string;
    pagination: PaginationMetadata | null;
};

export declare interface UseApiOptions {
    immediate?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: ApiError) => void;
    showSuccessMessage?: boolean;
    showErrorMessage?: boolean;
    throwOnError?: boolean;
}

export declare const useAppNavigation: (config: NavigationConfig) => {
    isActive: (path: string) => boolean;
    handleNavigate: (path: string) => void;
    createMenuItem: (key: string, label: string, path: string, icon?: React.ReactNode) => SidebarItemData;
    createMenuGroup: (label: string, items: Array<{
        key: string;
        label: string;
        path: string;
        icon?: React.ReactNode;
    }>) => SidebarGroup;
    currentPath: string;
};

export declare const useAuth: () => AuthContextData;

export declare function useBreadcrumbs(options: UseBreadcrumbsOptions): BreadcrumbItem[];

declare interface UseBreadcrumbsOptions {
    pathname: string;
    navigate: (path: string) => void;
    home?: {
        label: string;
        path: string;
    };
    menuItems?: SidebarItemData[];
    menuGroups?: SidebarGroup[];
}

export declare const useFormErrors: () => {
    fieldErrors: Record<string, string>;
    setErrors: (error: ApiError) => void;
    clearErrors: () => void;
    getError: (field: string) => string;
};

export declare const useGlobalLoader: () => GlobalLoaderContextType;

export declare const useI18n: () => I18nContextValue;

export declare function useNotifications(options?: UseNotificationsOptions): UseNotificationsReturn;

declare interface UseNotificationsOptions {
    pollingInterval?: number;
    enabled?: boolean;
}

declare interface UseNotificationsReturn {
    notifications: NotificationItem[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    clearAll: () => Promise<void>;
}

export declare const useOptionalAuth: () => AuthContextData | null;

export declare const useOptionalI18n: () => I18nContextValue | null;

export declare function usePermissions(): UsePermissionsReturn;

declare interface UsePermissionsReturn {
    permissions: string[];
    isRoot: boolean;
    hasPermission: (permission: string) => boolean;
    hasAnyPermission: (permissions: string[]) => boolean;
    hasAllPermissions: (permissions: string[]) => boolean;
}

export declare interface User {
    id: number;
    username: string;
    email: string;
    name: string;
    avatarUrl?: string;
    isActive?: boolean;
    lastLoginAt?: string;
}

export declare function UserProfilePage({ user, onEditProfile, onSaveProfile, onChangePassword, onManageSessions, className, }: UserProfilePageProps): JSX.Element;

export declare interface UserProfilePageProps {
    user: UserProfileUser;
    onEditProfile?: () => void;
    onSaveProfile?: (user: UserProfileUser) => void | Promise<void>;
    onChangePassword?: () => void;
    onManageSessions?: () => void;
    className?: string;
}

export declare function UserProfilePanel({ user, onEditProfile, onChangePassword, onManageSessions, className, }: UserProfilePanelProps): JSX.Element;

export declare interface UserProfilePanelProps {
    user: {
        name: string;
        email: string;
        username?: string;
        role?: string;
        avatarUrl?: string;
        preferredLanguage?: string;
        lastLoginAt?: string;
    };
    onEditProfile?: () => void;
    onChangePassword?: () => void;
    onManageSessions?: () => void;
    className?: string;
}

export declare interface UserProfileUser {
    name: string;
    email: string;
    username?: string;
    role?: string;
    avatarUrl?: string;
    preferredLanguage?: string;
    lastLoginAt?: string;
}

export declare const useTheme: () => ThemeContextType;

export declare function useToast(): {
    toast: typeof toast;
    dismiss: (toastId?: string) => void;
    toasts: ToasterToast[];
};

export { }
