import Header from "../../../components/Header";
type Bill = {
  id: number;
  billing_id: string;
  patient_id: string;
  discount_pct: number;
  total_amount: number;
  payment_method: string;
  status: string;
  receipt_id: string;
  billed_at: string;
}[];

type BillingProps = {
  billing: Bill;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadData(): Promise<void>;
  loading: boolean;
};
function Billing({ billing, open, setOpen, loadData, loading }: BillingProps) {
  return (
    <main className="flex-1 min-w-0">
      <Header
        open={open}
        setOpen={setOpen}
        loadData={loadData}
        page="Billing"
        loading={loading}
      />
    </main>
  );
}
export default Billing;
