<?php
$xml = $_POST['xml'];
if (isset($xml)) {
    $json = simplexml_load_string($xml);
    $_GET['json'] = json_encode($json, JSON_PRETTY_PRINT);
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    * {
        font-family: sans-serif;
    }

    .form {
        display: flex;
        gap: 20px;
    }

    h1 {
        line-height: 0;
    }

    .wrap {
        display: grid;
        place-content: center;
        height: 100vh;
        text-align: center;
    }

    button {
        width: 100%;
        display: block;
        margin-top: 20px;
        padding: 10px;
        outline: none;
        border: none;
        background-color: green;
        font-weight: bolder;
        color: white;
    }

    p {
        margin-bottom: 50px;
    }
    </style>
</head>

<body>
    <div class="wrap">
        <h1>XML TO JSON</h1>
        <p>Convert data XML ke data JSON</p>
        <form action="" method="post">
            <div class="form">
                <textarea name="xml" id="" cols="60" rows="30"><?= $xml ?></textarea>
                <textarea name="" id="" cols="60" rows="30"><?= $_GET['json'] ?></textarea>
            </div>
            <div class="action">
                <button type="submit">Convert</button>
            </div>
        </form>
    </div>
</body>

</html>