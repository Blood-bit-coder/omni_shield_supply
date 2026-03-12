program omni_shield_supply_v1.aleo;

record SupplyItem:
    owner as address.private;
    item_id as field.private;
    quantity as u64.private;
    is_shipped as boolean.private;

record BillOfLading:
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
    cast self.caller self.caller r1 r2 into r4 as BillOfLading.record;
    output r3 as SupplyItem.record;
    output r4 as BillOfLading.record;

constructor:
    assert.eq edition 0u16;
