<link rel="stylesheet" href="<?= base_url('assets/css/message.css') ?>">

<div class="message-form p-3">
	<div class="row">
		<div class="col-md-7">
			<div class="col-lg-12">
				<div  class="messages-history mb-4 card animated fadeIn shadow">
					<div class="card-header msg-header p-1">
						<div class="convo-name card-title m-0 d-flex"><p class="p-2"><i class="fas fa-comment-dots mr-2"></i>Conversation<p></div>
					</div>
					<div id="msg-hist" class="conversation p-3">
						<div class="main-convo">
							<i class="far fa-comments"></i>
							<p>Connect with other users.</p>
						</div>
					</div>
					<div class="msg-input-area d-flex">
						<div class="msg-input shadow-sm">
							<textarea id="msg-content"></textarea>
						</div>
						<button class="shadow-sm btn-send" disabled><i class="far fa-paper-plane"></i></button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-5">
			<div class="card mb-4 animated fadeIn shadow messages-area">
				<div class="card-header msg-header p-1">
					<div class="card-title m-0 d-flex"><p class="p-2"><i class="fas fa-users mr-2"></i>Contacts<p></div>
				</div>
				<div class="card-body p-0">
					<div class="msg-type d-flex row p-2">
						<div class="col-lg-6 pt-1 pb-1">
							<button id="recent-msg" class="btn btn-sm btn-primary m-auto d-block btn-msg active"><i class="fas fa-envelope-open mr-1"></i>Recent</button>
						</div>
						<div class="col-lg-6 pt-1 pb-1">
							<button id="new-msg" class="btn btn-sm btn-primary m-auto d-block btn-msg"><i class="fas fa-envelope mr-1"></i>New</button>
						</div>
					</div>
					<div class="msg-search shadow-sm p-2 d-flex mb-4">
						<input id="search-inbox" class="recent-msg" placeholder="Search..." type="text" name=""><i class="load"></i>
					</div>
					<div id="inbox">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="<?= base_url('assets/js/message.js') ?>"></script>