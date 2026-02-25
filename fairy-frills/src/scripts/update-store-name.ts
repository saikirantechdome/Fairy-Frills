import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { updateStoresWorkflow } from "@medusajs/medusa/core-flows";

export default async function updateStoreName({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const storeModuleService = container.resolve(Modules.STORE);

  logger.info("Updating store name to Fairy Frills...");
  
  const [store] = await storeModuleService.listStores();
  
  if (!store) {
    logger.error("No store found");
    return;
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        name: "Fairy Frills",
      },
    },
  });

  logger.info("Successfully updated store name to Fairy Frills");
}