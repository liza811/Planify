import { currentUser } from "./current-user";
import { db } from "./db";

export const getConfiguration = async () => {
  const user = await currentUser();
  if (!user) return null;
  const existingConfiguration = await db.configuration.findFirst({
    where: {
      departementId: user.departementId,
    },
  });
  if (!existingConfiguration) return null;

  return existingConfiguration;
};
export const getAdvancedConfiguration = async () => {
  const user = await currentUser();
  if (!user) return null;
  const existingConfiguration = await db.advancedConfiguration.findFirst({
    where: {
      departementId: user.departementId,
    },
  });
  if (!existingConfiguration) return null;

  return existingConfiguration;
};
