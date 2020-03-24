<script>
export default {
  name: 'VendorMapping',
  render() {
    return this.$scopedSlots.default({
      getVendorByName: () => ({ _id: '123456' }),
      getPurposeByName: () => ({ _id: '654321' }),
    });
  },
};
</script>
