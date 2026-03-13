program omni_shield_supply_v1.aleo {

    record SupplyItem {
        owner: address,
        item_id: field,
        quantity: u64,
        is_shipped: bool,
    }

    record BillOfLading {
        owner: address,
        from_node: address,
        to_node: address,
        timestamp: u32,
    }

    // --- ADDED CONSTRUCTOR TO FIX WARNING ---
    @noupgrade
    constructor() {
        // This initializes the program on-chain
    }

    // Manufacture a new supply item
    fn manufacture_item(receiver: address, id: field, qty: u64) -> SupplyItem {
        return SupplyItem {
            owner: receiver,
            item_id: id,
            quantity: qty,
            is_shipped: false,
        };
    }

    // Transfer custody of an item to another node
    fn transfer_custody(item: SupplyItem, next_owner: address, time: u32) -> (SupplyItem, BillOfLading) {
        assert_eq(self.caller, item.owner);
        
        let new_item: SupplyItem = SupplyItem {
            owner: next_owner,
            item_id: item.item_id,
            quantity: item.quantity,
            is_shipped: true,
        };
        
        let new_bill: BillOfLading = BillOfLading {
            owner: self.caller,
            from_node: self.caller,
            to_node: next_owner,
            timestamp: time,
        };
        
        return (new_item, new_bill);
    }
}