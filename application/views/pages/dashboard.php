<link rel="stylesheet" href="<?php echo base_url() ?>assets/css/dashboard.css">
	<?php 
    	$this->load->view('libraries/getWorkingDays');
    	$normal = 0;
    	$priority = 0;
    	$pdeadline = 0;
    	$holidays1 = array('');
    	foreach ($holidays as $key => $value) {
        	array_push($holidays1,$value->curYear.'-'.$value->holiday_date);
    	}
		foreach ($grievance2 as $key => $value) {
		  $nd = getWorkingDays($value->g_date_intake, $value->curDate, $holidays1) - 1;
		  $varianceND = $value->category_days - $nd;
		  if ($varianceND > 7) {
		  	$normal += 1;
		  } else if ($varianceND <= 7 && $varianceND >= 0) {
		  	$priority += 1;
		  } else if ($varianceND < 0) {
		  	$pdeadline += 1;
		  }
		}

		echo '<input id="nd-norm" type="text" value="'.$normal.'" hidden>';
		echo '<input id="nd-prio" type="text" value="'.$priority.'" hidden>';
		echo '<input id="nd-pdead" type="text" value="'.$pdeadline.'" hidden>';
	?>
<section class="animated fadeIn">
	<div class="mb-3">
		<button id="btn-dash1" class="shadow btn btn-dash active btn-sm"><i class="fas fa-grip-horizontal"></i></button>
		<button id="btn-dash2" class="shadow btn btn-dash ml-1 btn-sm"><i class="fas fa-bars"></i></button>
		<p class="float-right shadow btn btn-secondary btn-sm"><?php echo $grievance->DateNow; ?></p>
		<button class="btn btn-sm btn-print float-right btn-secondary shadow mr-2"><i class="fas fa-print mr-2"></i>Print</button>
	</div>
	<section id="dash-1">
		<div class="row">
			<div class="col-sm-4">
				<div class="card mt-1 mb-1 card-stats shadow">
				  <div class="card-body color-1 card-grievance p-3 text-nowrap">
				  	<i class="fas fa-list-alt float-left display-4 text"></i>
				  	<p class="text-right font-weight-bold mb-0">Grievance</p>
				  	<h3 class="text-right"><?php echo $grievance->countAll; ?></h3>
				  </div>
				  <div class="card-footer p-1 pl-3 pr-3">
				  	<i class="fas fa-arrow-alt-circle-right pt-1 float-right mb-0"></i>
				  	<p class="mb-0 text-nowrap" onclick="View_grievance()">View Grievance</p>
				  </div>
				</div>	
			</div>
			<div class="col-sm-4">
				<div class="card mt-1 mb-1 card-stats shadow">
				  <div class="card-body color-1 card-beneficiary p-3 text-nowrap">
				  	<i class="fas fa-users float-left display-4"></i>
				  	<p class="text-right font-weight-bold mb-0">Grantees</p>
				  	<h3 class="text-right"><?php echo $grantee->countAll; ?></h3> 
				  	<!-- <h3 class="text-right grantee-count"></h3> -->
				  </div>
				  <div class="card-footer p-1 pl-3 pr-3">
				  	<i class="fas fa-arrow-alt-circle-right pt-1 float-right mb-0"></i>
				  	<p class="mb-0 text-nowrap" onclick="Beneficiary()">View Beneficiary</p>
				  </div>
				</div>	
			</div>
			<div class="col-sm-4 ">
				<div class="card mt-1 mb-1 card-stats shadow">
				   <div class="card-body color-1 card-reports p-3 text-nowrap">
				  	<i class="fas fa-file-alt float-left display-4"></i>
				  	<p class="text-right font-weight-bold mb-0">Reports</p>
				  	<h3 class="text-right"><?php echo $reports->countAll; ?></h3>
				  </div>
				  <div class="card-footer p-1 pl-3 pr-3">
				  	<i class="fas fa-arrow-alt-circle-right pt-1 float-right mb-0"></i>
				  	<p class="mb-0 text-nowrap" onclick="Reports()">View Reports</p>
				  </div>
				</div>	
			</div>
			<div class="col-lg-8">
				<div class="card shadow card-chart p-3 chart-container mt-4">
					<canvas id="barChart1"></canvas>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="card shadow card-chart p-3 chart-container mt-4 w-100">
					<canvas id="doughnut1"></canvas>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="card shadow card-chart mt-4 chart-container p-3">
					<canvas id="doughnut2"></canvas>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="print-div card shadow card-chart mt-4 chart-container p-3">
					<canvas id="barChart2"></canvas>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="card shadow card-chart mt-4 chart-container p-3">
					<canvas id="pieChart2"></canvas>
				</div>
			</div>
		</div>
	</section>
	<section id="dash-2" class="d-n">
		<div class="row">
		  <div class="col-xl-6 mb-5">
		  	<div class="card shadow animated fadeIn">
		  		<div class="card-header">
		  			<div class="card-title m-0 h6"><i class="fas fa-table mr-2"></i>Province</div>
		  		</div>
		  		<div class="card-body p-3">
	  				<div class="table-responsive">
				  		<table id="tbl-dash-bar" class=" tbl-dash table table-striped table-bordered animated fadeIn" >
						  <thead>
						  	  <tr>
						  	  	<th colspan="4" class="text-center">Per Area</th>
						  	  </tr>
						      <tr>
					          	<th>Province</th>
								<th>Total #</th>
								<th># of Resolved</th>
								<th># of Ongoing</th>
						      </tr>
						  </thead>
						  <tbody>
						    <?php  
								foreach ($province as $key => $value) {
									echo '<tr>';  					
									echo '<td>'. $value->g_province .'</td>';
									echo '<td>'. $value->countAll .'</td>';
									echo '<td>'. $value->countResolved .'</td>';
									echo '<td>'. $value->countOngoing .'</td>';
									echo '</tr>';
								}
							?>
						  </tbody>
						  <tfoot>
						  	<tr>
						  		<th>Total</th>
						  		<th></th>
						  		<th></th>
						  		<th></th>
						  	</tr>
						  </tfoot>
						</table>
				  	</div>
		  		</div>
		  	</div>
		  </div>
		  <div class="col-xl-6 mb-5">
		  	<div class="card shadow animated fadeIn">
		  		<div class="card-header">
		  			<div class="card-title m-0 h6"><i class="fas fa-chart-bar mr-2"></i>Province</div>
		  		</div>
		  		<div class="card-body p-3">
					<div class="chart-container">
			    		<canvas id="myChart" class="dash-chart"></canvas>
					</div>
				</div>
			</div>
		  	
		  </div>
		  <div class="col-xl-6 mb-5">
		  	<div class="card shadow animated fadeIn">
		  		<div class="card-header">
		  			<div class="card-title m-0 h6"><i class="fas fa-table mr-2"></i>Category</div>
		  		</div>
		  		<div class="card-body p-3">
		  			<div class="table-responsive">
				  		<table id="tbl-dash-bar-h" class="tbl-dash table table-striped table-bordered animated fadeIn nowrap">
						  <thead>
						  	  <tr>
						  	  	<th colspan="4" class="text-center">Per Category</th>
						  	  </tr>
						      <tr>
					          	<th width="10">Category</th>
								<th width="5">Total #</th>
								<th width="5"># of Resolved</th>
								<th width="5"># of Ongoing</th>
						      </tr>
						  </thead>
						  <tbody>
						    <?php  
								foreach ($category as $key => $value) {
									echo '<tr>';  					
									echo '<td style="word-break: break-word !important;">'. $value->g_category .'</td>';
									echo '<td>'. $value->countAll .'</td>';
									echo '<td>'. $value->countResolved .'</td>';
									echo '<td>'. $value->countOngoing .'</td>';
									echo '</tr>';
								}
							?>
						  </tbody>
						  <tfoot>
						  	<tr>
						  		<th>Total</th>
						  		<th></th>
						  		<th></th>
						  		<th></th>
						  	</tr>
						  </tfoot>
						</table>
				  	</div>
				</div>
			</div>
		  	
		  </div>
		  <div class="print-div1 col-xl-6 mb-5">
		  	<div class="card shadow animated fadeIn">
		  		<div class="card-header">
		  			<div class="card-title m-0 h6"><i class="fas fa-chart-bar mr-2"></i>Category</div>
		  		</div>
		  		<div class="card-body p-3">
		  			<div class="chart-container">
					    <canvas id="myChart2" class="dash-chart"></canvas>
					</div>
				</div>
			</div>
		  </div>
		  <div class="col-xl-6 mb-5">
		  	<div class="card shadow animated fadeIn">
		  		<div class="card-header">
		  			<div class="card-title m-0 h6"><i class="fas fa-table mr-2"></i>Report Modes</div>
		  		</div>
		  		<div class="card-body p-3">
		  			<div class="table-responsive">
				  		<table id="tbl-dash-pie" class="tbl-dash table table-striped table-bordered animated fadeIn">
						  <thead>
						  	  <tr>
						  	  	<th colspan="4" class="text-center">Per Channel</th>
						  	  </tr>
						      <tr>
					          	<th width="10">Mode</th>
								<th width="5">Total #</th>
								<th width="5"># of Resolved</th>
								<th width="5"># of Ongoing</th>
						      </tr>
						  </thead>
						  <tbody>
						    <?php  
								foreach ($mode as $key => $value) {
									echo '<tr>';  					
									echo '<td style="word-break: break-word !important;">'. $value->g_mode .'</td>';
									echo '<td>'. $value->countAll .'</td>';
									echo '<td>'. $value->countResolved .'</td>';
									echo '<td>'. $value->countOngoing .'</td>';
									echo '</tr>';
								}
							?>
						  </tbody>
						  <tfoot>
						  	<tr>
						  		<th>Total</th>
						  		<th></th>
						  		<th></th>
						  		<th></th>
						  	</tr>
						  </tfoot>
						</table>
				  	</div>
				</div>
			</div>
		  </div>
		  <div class="col-xl-6 mb-5">
		  	<div class="card shadow animated fadeIn">
		  		<div class="card-header">
		  			<div class="card-title m-0 h6"><i class="fas fa-chart-pie mr-2"></i>Report Modes</div>
		  		</div>
		  		<div class="card-body p-3">
		  			<div class="chart-container">
					    <canvas id="myChart3" class="dash-chart"></canvas>
					</div>
				</div>
			</div>
		  </div>
		</div>
	</section>
</section>

<script src="<?php echo base_url() ?>assets/js/dashboard.js"></script>
