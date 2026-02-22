import { supabase } from "../supabase/createClient";
import type { Amenity, Service, Package } from "../types/contract";

/**
 * Represents the main columns in your 'contracts' table.
 */
export interface ContractRecord {
  start_time: string;
  end_time: string;
  status?: "draft" | "confirmed";
  updated_at?: string;
}

/**
 * Represents the full JSON state saved in 'contract_versions'.
 * You can replace 'any' with your actual 'state' interface from useContract.
 */
export interface ContractSnapshot {
  amenities: Amenity[];
  customServices: Service[];
  customPackages: Package[];
}

/**
 * The response type from Supabase for a single contract.
 */
interface ContractRow extends ContractRecord {
  id: string;
  contract_ref: string;
  created_at: string;
}

export const contractApi = {
  /**
   * CREATE: Inserts a new contract and its initial version snapshot.
   */
  async createContract(
    contractData: ContractRecord,
    snapshot: ContractSnapshot,
  ): Promise<ContractRow> {
    const contractRef = `CNT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // 1. Create the base contract
    const { data: contract, error: contractError } = await supabase
      .from("contracts")
      .insert([
        {
          ...contractData,
          contract_ref: contractRef,
          status: "pending", // only acceptable pencil bookings
        },
      ])
      .select()
      .single();

    if (contractError) throw contractError;

    // 2. Create the first version
    const { error: versionError } = await supabase
      .from("contract_versions")
      .insert([
        {
          contract_id: contract.id,
          version_num: 1,
          contract_snapshot: snapshot,
        },
      ]);

    if (versionError) throw versionError;

    return contract as ContractRow;
  },

  /**
   * UPDATE: Updates parent timestamps and inserts a new version snapshot.
   */
  async updateContract(
    contractId: string,
    contractData: ContractRecord,
    snapshot: ContractSnapshot,
  ): Promise<string> {
    // 1. Get latest version number
    const { data: latest, error: fetchError } = await supabase
      .from("contract_versions")
      .select("version_num")
      .eq("contract_id", contractId)
      .order("version_num", { ascending: false })
      .limit(1)
      .maybeSingle(); // Better than .single() if no versions exist yet

    if (fetchError) throw fetchError;

    // 2. Update the parent record
    const { error: updateError } = await supabase
      .from("contracts")
      .update({
        start_time: contractData.start_time,
        end_time: contractData.end_time,
        updated_at: new Date().toISOString(),
      })
      .eq("id", contractId);

    if (updateError) throw updateError;

    // 3. Insert the new version snapshot
    const { error: versionError } = await supabase
      .from("contract_versions")
      .insert([
        {
          contract_id: contractId,
          version_num: (latest?.version_num || 0) + 1,
          contract_snapshot: snapshot,
        },
      ]);

    if (versionError) throw versionError;

    return contractId;
  },

  /**
   * FINALIZE: Optional helper to change status and seal the contract
   */
  async finalizeContract(contractId: string): Promise<void> {
    const { error } = await supabase
      .from("contracts")
      .update({ status: "confirmed" })
      .eq("id", contractId);

    if (error) throw error;
  },
};
