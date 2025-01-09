---
title: Get Started
group: Guides
---

# Get Started

This is the Node SDK for the Shipgenius OMS API.
From here, you can rate packages across multiple carriers and purchase shipping labels.

## Getting your credentials

To use the API, you must have a Shipgenius business account.
[Create an account](https://lite.shipgeni.us/create-account) or [Sign in](https://lite.shipgeni.us/home) if you already have one.
Make sure the account you create is an Business Account rather than an Individual Account, as individual accounts are not currently supported on the API.

Once signed in, go the the [Connected Apps](https://lite.shipgeni.us/connected-apps) page, and register a new app by clicking the "Create New App" button.

You'll have to give your app a name and some permissions specifying what it's allowed to do.
You can change these later, but keep in mind that your app will be unable to perform any actions it does not currently have permissions for.

After clicking "create" your app will appear in your apps list. Under the app name will be the API keys associated with the app.
The full key is hidden by default for security reasons.
To view it, click on the key to open a details view, then click the eye icon to view the full key.

Your will need this key in the next step.

> [!CAUTION]
> ### Keep your key safe
> 
> Your API key can be used to authenticate as business with the permissions you granted.
>
> Here are some rules to make sure it stays safe:
> - Do not share it with anyone who should not have this access, including Shipgenius customer support
> - Regularly rotate your key. You can do this by clicking into the key details and clicking "rotate".
    You will be prompted for confirmation and an expiration time so you have time to swap out the key in any apps that use it.
> - Use secret managers and environment variables to ensure your key is never committed to a source control system.
> - If you suspect your key has been leaked, immediately pause it to prevent it from being used.
    You can do this by clicking into the key details and clicking "pause".
    Note that any apps using this key will not be able to authenticate while the key is paused.
    Unlike rotating the key, this *can* be undone by clicking "resume" if you conclude the key is safe.
>

## Instantiating the client

This module's default export is a client you can use to connect to and interact with the API.

To instantiate it, you need to pass it your API key and specify which server you want to connect to (production or sandbox).
For more details see {@link "@shipgenius/oms".ShipGeniusOmsClient.constructor | ShipGeniusOmsClient} documentation.

```typescript
import ShipGeniusOmsClient, { ServerEnvironment } from "@shipgenius/oms/client";

const client = new ShipGeniusOmsClient(
    "<your-sandbox-api-key>",
    { environment: ServerEnvironment.SANDBOX },
);
```

## Testing your setup

Once you have your client instantiated, you can use it to test your setup by calling the {@link "@shipgenius/oms".ShipGeniusOmsClient.getSupportedCarriers | `getSupportedCarriers`} method.

Run this code, replacing `"<your-sandbox-api-key>"` with your key:

```typescript
import ShipGeniusOmsClient, { HttpError, ServerEnvironment } from "@shipgenius/oms/client";

const client = new ShipGeniusOmsClient(
    "<your-sandbox-api-key>",
    { environment: ServerEnvironment.SANDBOX },
);

async function testSetup() {
    try {
        return await client.getSupportedCarriers();
    }
    catch(err) {
        if(err instanceof HttpError) {
            return await err.getMessage();
        }
        else {
            throw err;
        }
    }
}

// Call this from your entry point
console.log(await testSetup());

// Outputs => CarrierList {
//   carriers: [
//     Carrier {
//       id: '3',
//       name: 'FedEx',
//       description: '<FedEx description>'
//     },
//     Carrier {
//       id: '4',
//       name: 'UPS',
//       description: '<UPS description>'
//     },
//     Carrier {
//       id: '5',
//       name: 'DHL',
//       description: '<DHL description>'
//     },
//     Carrier {
//       id: '6',
//       name: 'USPS',
//       description: '<USPS description>'
//     }
//   ]
// }
```

If the output is a {@link "@shipgenius/oms/models".CarrierList | `CarrierList`}, you're ready to use the Shipgenius OMS API!

If the output is `Invalid authorization`, check your API key and make sure you're using the right one for the environment you're connecting to.

If you have some other output, something else went wrong. Feel free to each out to [Shipgenius Support](mailto:info@shipgeni.us) for help.

## Next steps

Now that you're set up, check out the {@link "@shipgenius/oms".ShipGeniusOmsClient | ShipGeniusOmsClient} documentation for a full list of methods.

You can also use the navigation menu on this page to view guides and documentation for the full SDK.
