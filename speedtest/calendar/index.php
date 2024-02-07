<?php
$year = isset($_GET['year']) ? $_GET['year'] : date('Y');
$month = isset($_GET['month']) ? $_GET['month'] : date('m');

$daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year);

$nextMonth = $month + 1;
$nextYear = $year;
if ($nextMonth > 12) {
    $nextYear = $nextYear + 1;
    $nextMonth = 1;
}

$prevMonth = $month - 1;
$prevYear = $year;
if ($prevMonth < 1) {
    $prevYear = $prevYear - 1;
    $prevMonth = 12;
}


$nextLink = "http://localhost:8000?month=$nextMonth&year=$nextYear";
$prevLink = "http://localhost:8000?month=$prevMonth&year=$prevYear";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar</title>
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <div class="wrap">
        <div class="calendar">
            <div class="calendar-header">
                <div class="header-left">
                    <a href="<?= $prevLink ?>">Prev</a>
                </div>
                <div class="header-center">
                    <div class="">
                        <h1><?= date('F', strtotime("$year-$month-01")) ?></h1>
                        <b><?= date('Y', strtotime("$year-$month-01")) ?></b>
                    </div>
                </div>
                <div class="header-right">
                    <a href="<?= $nextLink ?>">Next</a>
                </div>
            </div>
            <div class="calendar-body">
                <div class="row">
                    <div class="col">SUN</div>
                    <div class="col">MON</div>
                    <div class="col">TUE</div>
                    <div class="col">WED</div>
                    <div class="col">THU</div>
                    <div class="col">FRI</div>
                    <div class="col">SAT</div>
                </div>

                <?php
                $currentDay = 1;
                $today = date('j');
                for ($i = 1; $i <= 5; $i++) {
                    echo '<div class="row">';
                    for ($j = 0; $j < 7; $j++) {
                        if (($i == 1 && $j < date('w', strtotime("$year-$month-01"))) || $currentDay > $daysInMonth) {
                            echo '<div class="col"></div>';
                        } else {
                            $class = ($currentDay == $today && $month == date('m') && $year == date('Y')) ? 'today' : '';
                            echo '<div class="col ' . $class . '">' . $currentDay . '</div>';
                            $currentDay++;
                        }
                    }
                    echo '</div>';
                }
                ?>
            </div>
        </div>
    </div>
</body>

</html>