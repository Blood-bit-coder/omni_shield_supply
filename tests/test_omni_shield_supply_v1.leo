// The 'test_omni_shield_supply_v1' test program.
import omni_shield_supply_v1.aleo;
program test_omni_shield_supply_v1.aleo {
    @test
    @should_fail
    fn do_nothing() {
        let result: u32 = omni_shield_supply_v1.aleo/main(2u32, 3u32);
        assert_eq(result, 3u32);
    }

    @noupgrade
    constructor() {}
}

@test
script test_it() {
    let result: u32 = omni_shield_supply_v1.aleo/main(1u32, 2u32);
    assert_eq(result, 3u32);
}
