// Essential crates f
use ic_cdk::api::{caller, time};
use ic_cdk_macros::{query, update}; 
use std::collections::BTreeMap; 
use std::cell::RefCell; 
use candid::{CandidType, Deserialize, Principal}; 


/// Rep. metadata for a single honey batch NFT.
#[derive(CandidType, Deserialize, Clone)] 
struct HoneyBatch {
    pub id: u64, // Unique identifier for this honey batch (acts as NFT ID)
    pub beekeeper_id: Principal, 
    pub location: String, 
    pub quality: String, // E.g., "Organic Certified", "Wildflower", "Tested Grade A"
    pub timestamp: u64, 
}

// Canister State Management

thread_local! {
    // A counter to assign unique IDs to new honey batches.
    static NEXT_BATCH_ID: RefCell<u64> = RefCell::new(0);

    static HONEY_BATCHES: RefCell<BTreeMap<u64, HoneyBatch>> = RefCell::new(BTreeMap::new());
}

//  Canister Update Methods (State-changing operations)
/// Mints a new honey batch NFT (simplified ICRC-7 concept).
/// Only non-anonymous principals can mint.

#[update]
fn mint_honey_batch(location: String, quality: String) -> Result<u64, String> {
    let caller_id = caller();
    
    // Disallow anonymous calls for security/attribution
    if caller_id == Principal::anonymous() {
        return Err("Anonymous principal not allowed to mint honey batches.".to_string());
    }

    // Get a new unique batch ID and increment the counter
    let batch_id = NEXT_BATCH_ID.with(|id_counter| {
        let current_id = *id_counter.borrow(); 
        *id_counter.borrow_mut() += 1; 
        current_id
    });

    // Get current timestamp in nanoseconds and convert to seconds
    let current_timestamp_seconds = time() / 1_000_000_000; 

    // Create the new HoneyBatch struct
    let honey_batch = HoneyBatch {
        id: batch_id,
        beekeeper_id: caller_id,
        location, 
        quality,   
        timestamp: current_timestamp_seconds,
    };

    // Store the new honey batch in our BTreeMap
    HONEY_BATCHES.with(|batches| {
        batches.borrow_mut().insert(batch_id, honey_batch);
    });

    // Return the ID of the newly minted batch
    Ok(batch_id)
}

//  Canister Query Methods (Read-only operations)
/// Retrieves the details of a specific honey batch by its ID.

#[query]
fn get_honey_batch_details(batch_id: u64) -> Option<HoneyBatch> {
    HONEY_BATCHES.with(|batches| {
        batches.borrow().get(&batch_id).cloned() // .
    })
}

/// A simple query function to test canister responsiveness.
#[query]
fn greet(name: String) -> String {
    format!("Hello, {}! Your DFINITY backend is running.", name)
}
