// aleo-integration.js
// This file connects your HTML frontend to the Aleo blockchain

// Global variables
let programManager;
let account;
let isInitialized = false;
let programSource = null;

// Initialize the Aleo SDK
async function initializeAleo() {
    try {
        console.log("🚀 Initializing Aleo SDK...");
        
        // Check if Aleo SDK is loaded
        if (typeof ProgramManager === 'undefined') {
            console.error("Aleo SDK not loaded. Make sure the script is included in your HTML.");
            // Try to show toast if the function exists
            if (typeof window.showToast === 'function') {
                window.showToast("Aleo SDK not loaded. Check console for details.", "error");
            }
            return false;
        }
        
        // Initialize the threadpool for better performance
        if (typeof initThreadPool !== 'undefined') {
            await initThreadPool();
            console.log("✅ ThreadPool initialized");
        }
        
        // Create a program manager instance
        programManager = new ProgramManager();
        console.log("✅ ProgramManager created");
        
        // Create a temporary account for execution
        // In production, you'd use a real wallet like Leo Wallet
        account = new Account();
        programManager.setAccount(account);
        
        isInitialized = true;
        console.log("✅ Aleo SDK initialized successfully!");
        console.log("📝 Temporary address:", account.address().to_string());
        
        // Load your program
        await loadProgramFromFile();
        
        return true;
    } catch (error) {
        console.error("❌ Failed to initialize Aleo SDK:", error);
        return false;
    }
}

// Load your compiled Leo program
async function loadProgramFromFile() {
    try {
        console.log("📂 Loading program...");
        
        // Use your actual compiled program
        programSource = `program omni_shield_supply_v1.aleo;

record SupplyItem:
    owner as address.private;
    item_id as field.private;
    quantity as u64.private;
    is_shipped as boolean.private;

record BillofLading:
    owner as address.private;
    from_node as address.private;
    to_node as address.private;
    timestamp as u32.private;

function manufacture_item:
    input r0 as address.private;
    input r1 as field.private;
    input r2 as u64.private;
    cast r0 r1 r2 false into r3 as SupplyItem.record;
    output r3 as SupplyItem.record;

function transfer_custody:
    input r0 as SupplyItem.record;
    input r1 as address.private;
    input r2 as u32.private;
    assert.eq self.caller r0.owner;
    cast r1 r0.item_id r0.quantity true into r3 as SupplyItem.record;
    cast self.caller self.caller r1 r2 into r4 as BillofLading.record;
    output r3 as SupplyItem.record;
    output r4 as BillofLading.record;`;
        
        console.log("✅ Program loaded successfully!");
        console.log("Program source length:", programSource.length, "characters");
        
    } catch (error) {
        console.error("❌ Failed to load program:", error);
        programSource = null;
    }
}

// Execute manufacture_item function
async function executeManufactureItem(receiver, itemId, quantity) {
    if (!isInitialized) {
        const initialized = await initializeAleo();
        if (!initialized) {
            return {
                success: false,
                error: "Aleo SDK not initialized"
            };
        }
    }
    
    if (!programSource) {
        return {
            success: false,
            error: "Program not loaded"
        };
    }
    
    try {
        console.log("🔨 Executing manufacture_item...");
        console.log("Inputs:", { receiver, itemId, quantity });
        
        // Format inputs properly for Aleo
        // Make sure quantity is a number and properly formatted
        const qtyNum = parseInt(quantity);
        if (isNaN(qtyNum)) {
            throw new Error("Quantity must be a number");
        }
        
        const inputs = [
            receiver,                    // address
            itemId,                      // field (should already include 'field' suffix)
            `${qtyNum}u64`                // u64
        ];
        
        console.log("Formatted inputs:", inputs);
        
        // Execute the program locally
        const executionResponse = await programManager.executeOffline(
            programSource,
            "manufacture_item",
            inputs,
            false,  // Don't prove execution
            false   // Don't verify execution
        );
        
        // Get the outputs
        const outputs = executionResponse.getOutputs();
        console.log("✅ Execution successful!");
        console.log("Outputs:", outputs);
        
        return {
            success: true,
            outputs: outputs
        };
    } catch (error) {
        console.error("❌ Execution failed:", error);
        return {
            success: false,
            error: error.message || "Unknown error"
        };
    }
}

// Execute transfer_custody function
async function executeTransferCustody(itemRecord, nextOwner, timestamp) {
    if (!isInitialized) {
        const initialized = await initializeAleo();
        if (!initialized) {
            return {
                success: false,
                error: "Aleo SDK not initialized"
            };
        }
    }
    
    if (!programSource) {
        return {
            success: false,
            error: "Program not loaded"
        };
    }
    
    try {
        console.log("🚚 Executing transfer_custody...");
        console.log("Inputs:", { itemRecord, nextOwner, timestamp });
        
        // Format timestamp as number
        const tsNum = parseInt(timestamp);
        if (isNaN(tsNum)) {
            throw new Error("Timestamp must be a number");
        }
        
        const inputs = [
            itemRecord,                   // The SupplyItem record
            nextOwner,                     // address
            `${tsNum}u32`                   // u32
        ];
        
        console.log("Formatted inputs:", inputs);
        
        // Execute the program locally
        const executionResponse = await programManager.executeOffline(
            programSource,
            "transfer_custody",
            inputs,
            false,  // Don't prove execution
            false   // Don't verify execution
        );
        
        // Get the outputs
        const outputs = executionResponse.getOutputs();
        console.log("✅ Transfer successful!");
        console.log("Outputs:", outputs);
        
        if (outputs && outputs.length >= 2) {
            console.log("New SupplyItem:", outputs[0]);
            console.log("BillofLading:", outputs[1]);
        }
        
        return {
            success: true,
            outputs: outputs
        };
    } catch (error) {
        console.error("❌ Transfer failed:", error);
        return {
            success: false,
            error: error.message || "Unknown error"
        };
    }
}

// Helper function to parse record output into a format we can store
function parseRecordOutput(recordString) {
    try {
        // Return the record as is for now
        return recordString;
    } catch (error) {
        console.error("Error parsing record:", error);
        return recordString;
    }
}

// Make functions globally available
window.aleoIntegration = {
    initialize: initializeAleo,
    manufactureItem: executeManufactureItem,
    transferCustody: executeTransferCustody,
    parseRecord: parseRecordOutput
};

console.log("📦 aleo-integration.js loaded successfully!");
console.log("✅ Available functions:", Object.keys(window.aleoIntegration));