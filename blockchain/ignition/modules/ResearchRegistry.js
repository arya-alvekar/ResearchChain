import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ResearchRegistryModule", (m) => {
  const registry = m.contract("ResearchRegistry");

  return { registry };
});