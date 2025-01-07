/**
 * The type of ShipGenius OMS API server connected to
 *
 * - PRODUCTION = Actual server to purchase real labels
 * - SANDBOX = Simple testing server with mock responses
 * - DEVELOPMENT = More complex testing environment with semi-persistent data, but still no real money or labels
 */
export type ServerEnvironment = "PRODUCTION" | "SANDBOX" | "DEVELOPMENT";

/**
 * Arguments for the ShipGeniusOmsClient constructor
 *
 * @example
 * ```typescript
 * {
 *     api_key: "489ebeef28938f81623e55953c2d8b48bf22e3985fde1762fcd436d4b1563602",
 *     server: {
 *         environment: "SANDBOX"
 *     }
 * }
 * ```
 */
export interface ShipGeniusOmsClientConstructorArguments {
    /**
     * The API Key used to authenticate with the ShipGenius OMS server
     *
     * You can create one through the [Connected Apps portal](https://lite.shipgeni.us/connected-apps)
     */
    api_key: string;
    /**
     * The server to connect to
     *
     * Can be specified either using `environment` (recommended) or `url` (not recommended)
     */
    server:
        | {
              /**
               * The standard Shipgenius-run server
               *
               * - PRODUCTION = Actual server to purchase real labels
               * - SANDBOX = Simple testing server with mock responses
               * - DEVELOPMENT = More complex testing environment with semi-persistent data, but still no real money or labels
               */
              environment: ServerEnvironment;
              /**
               * A custom url pointing to the Shipgenius OMS server
               *
               * Useful if you need to connect indirectly or to a development server
               */
              url?: undefined | null;
          }
        | {
              /**
               * A custom url pointing to the Shipgenius OMS server
               *
               * Useful if you need to connect indirectly or to a development server
               */
              url: string;
              /**
               * The standard Shipgenius-run server
               *
               * - PRODUCTION = Actual server to purchase real labels
               * - SANDBOX = Simple testing server with mock responses
               * - DEVELOPMENT = More complex testing environment with semi-persistent data, but still no real money or labels
               */
              environment?: undefined | null;
          };
}
