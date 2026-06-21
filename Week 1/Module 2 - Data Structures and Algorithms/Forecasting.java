public class Forecasting {

    public static double calculateFutureValue(double presentValue, double rate, int years) {
        if (years == 0) {
            return presentValue;
        }

        return calculateFutureValue(presentValue, rate, years - 1) * (1 + rate);
    }

    public static void main(String[] args) {
        double presentValue = 10000;
        double growthRate = 0.05;
        int years = 10;

        double futureValue = calculateFutureValue(presentValue, growthRate, years);

        System.out.println("Future Value after " + years + " years: " + futureValue);
    }
}