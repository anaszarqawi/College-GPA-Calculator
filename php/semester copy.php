<div id="semester" class="semester 1">
    <table>
        <caption>Semester 1</caption>
        <tbody>
            <tr>
                <!-- <td>No.</td> -->
                <td colspan="2">Course</td>
                <td>Grade<sup style="color: #f00;">*</sup></td>
                <td>Credit<sup style="color: #f00;">*</sup></td>
            </tr>
            <?php
                include './row.php'
            ?>        
        </tbody>

    </table>

    <div id="btns">
        <input type="number" max="12" title="Number of rows to add" value="3" class="num_of_row_wanted">
        <button class="add-course" title="Add another course" >Add Course</button>
        <button class="clear" title="Clear Data" >Clear</button>
    </div>

    <?php include './options.php' ?>

</div>   
